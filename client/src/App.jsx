
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import SubmissionForm from './Components/SubmissionForm'
import {Toaster} from 'react-hot-toast'
function App() {
  

  return (
    <>
    <div><Toaster/></div>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/submitForm' element={<SubmissionForm/>}/>
     </Routes>
    </>
  )
}

export default App
