import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="relative w-full bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <div className="inline-flex items-center space-x-2">
       
        <span className="font-bold"><Link to={'/'}>TUF TASK.</Link></span>
      </div>
    
      <div className="lg:block">
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
        <Link to={'/submitForm'}>Make a Submission</Link>
        </button>
      </div>
     
      
    </div>
  </div>
  )
}

export default Navbar