

import express from 'express';
import mysql from 'mysql2';
import {v4 as uuidv4} from 'uuid';
import Submission from './submission.model.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(cors({
    origin:'*'
}))
app.use(express.json())
// MySQL database configuration
// Function to create a database connection
function createConnection() {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  };

  return mysql.createConnection(dbConfig);
}


// route to query the database for submissions
app.get('/api/submissions', async(req, res) => {
  // Perform a query
  const connection=await createConnection()
  connection.query('SELECT * FROM submissions', (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


//create a submission to the db
app.post('/api/make/submission', async(req, res) => {
    try{
  const connection=await createConnection()

    const { username, language, stdin, code } = req.body;
    if(!username || !language || !stdin || !code){
        return res.status(422).json({error:'Some fields are missing'})
    }
    const id=uuidv4()
    // Create a new Submission instance
    const submission = new Submission(id, username, language, stdin, code);
    
    // Perform database insertion
    connection.query('INSERT INTO submissions SET ?', submission, (error, result) => {
      if (error) {
        console.error('Error inserting submission into database:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'Submission created successfully', id: result.insertId });
    });
}
catch(err){
    console.log(err)
}
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
