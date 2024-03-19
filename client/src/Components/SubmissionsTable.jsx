import React from 'react'
import Popup from './Popup';

import { ring2 } from 'ldrs'

ring2.register()



export default function SubmissionsTable({data,loading}) {
  const [open, setOpen] = React.useState(false)
const [sourceCode,setSourceCode]=React.useState('')
function formatDate(date){
  const timestamp = new Date(date);

  const day = timestamp.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[timestamp.getMonth()];
  const year = timestamp.getFullYear();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();
  
  const formattedDate = `${day} ${monthName} ${year} ${hours}:${minutes}:${seconds}`;
  
 return formattedDate
  
}
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Submissions</h2>
           
          </div>
          
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <b>Username</b>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                      <b> Code language</b> 
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                       <b> Standard Input(stdin)</b>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                       <b>Source Code</b> 
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                         <b>Submitted at</b>
                      </th>
                    </tr>
                  </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                   
                    {data?.map((submission) => (
                      <tr key={submission.id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                           
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{submission.username}</div>
                             
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{submission.language}</div>
                
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5">
                            {submission.stdin}
                          </span>
                        </td>
                        {submission?.code?.length>100 ?
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 text-wrap">
                        <code>{submission.code.substring(0,100)+"..."} </code><span className='underline text-blue-500 cursor-pointer' onClick={()=>{
                          setSourceCode(submission.code)
                          setOpen(true)}}>Read more</span>
                      </td>
                      :
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          <code>{submission.code}</code>
                        </td>}
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                          {formatDate(submission.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               {loading && <div className='flex justify-center items-center mt-4'>

<l-ring-2
size="40"
stroke="5"
stroke-length="0.25"
bg-opacity="0.1"
speed="0.8" 
color="black" 
></l-ring-2>
<b className='ml-4'>Loading submissions...</b>
</div>}
          
              </div>
            </div>
          </div>
        </div>
      </section>
      <Popup open={open} setOpen={setOpen} sourceCode={sourceCode}/>
    </>
  )
}
