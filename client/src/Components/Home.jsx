
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SubmissionsTable from './SubmissionsTable'




export default function Home() {
    const [submissions,setSubmissions]=useState([])
    const [loading,setLoading]=useState(true)
    async function getSubmissions(){
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/submissions`)
        const data=await response.json()
        setSubmissions(data)
        setLoading(false)
    }
 useEffect(()=>{
getSubmissions()
 },[])
  return (
    <>
   <Navbar/>
   <SubmissionsTable data={submissions} loading={loading}/>
   </>
  )
}
