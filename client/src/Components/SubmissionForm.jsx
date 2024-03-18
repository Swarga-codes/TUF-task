import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import {toast} from 'react-hot-toast'
function SubmissionForm() {
    const [username,setUsername]=useState("")
    const [language,setLanguage]=useState("Javascript")
    const [stdin,setStdin]=useState("")
    const [code,setCode]=useState("")
    const navigator=useNavigate()
    async function submitTask(){
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/make/submission`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
                language,
                stdin,
                code
            })
        })
        const data=await response.json()
        if(data.message){
            toast.success(data.message)
            navigator('/')
        }
        else{
            toast.error(data.error)
        }
    }
  return (
    <>
    <Navbar/>
    <div className='p-10 px-36'>
        <h1 className='text-2xl'>Submission Form</h1>
        <form className='mt-5' onSubmit={(e)=>{
            e.preventDefault()
            submitTask()
        }}>
        <div className="w-full md:w-1/3">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="name"
      >
        Name
      </label>
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Enter your username"
        id="name"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        required
      ></input>
    </div>
            <div className='mt-4'>
                
                <label 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="language">Preferred Programming Language</label>
                <br />
                <select name="language" id="language" required onChange={(e)=>{
                    setLanguage(e.target.value)
                }} className='border-2 border-solid border-black/80 rounded-md p-2'>
                    <option value="Javascript">Javascript</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                </select>
            </div>
            <div className="w-full mt-4 md:w-1/3">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="input"
      >
        Standard Input(Stdin)
      </label>
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Enter the standard input"
        id="input"
        value={stdin}
        onChange={(e)=>setStdin(e.target.value)}
        required
      ></input>
    </div>
    <div className="w-full mt-4 md:w-1/3">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="code"
      >
       Source Code
      </label>
      <textarea
        className="flex h-36 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Enter the source code"
        id="code"
        value={code}
        onChange={(e)=>setCode(e.target.value)}
        required
      ></textarea>
    </div>
    <button
        type="submit"
        className="mt-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
       Submit Task
      </button>
        </form>
    </div>
    </>
  )
}

export default SubmissionForm