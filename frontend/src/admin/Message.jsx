import axios from '../helper/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'

export default function Message() {
    let [msg,setMsg] = useState([])
    let [success,setSuccess] = useState(null)

    useEffect(()=>{
        let fetchMsg = async()=>{
            try {
                let data = await axios.get('/contact')
                setMsg(data.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchMsg()
    },[])

    const downloadExcel = () =>{
        const worksheet = XLSX.utils.json_to_sheet(msg.map((msg,i)=>({
            No : i+1,
            Name : msg.name,
            Email : msg.email,
            Phone : msg.phone,
            Whatsapp : msg.whatsapp,
            Message : msg.message
        })))
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,'Message');
        XLSX.writeFile(workbook,'message.xlsx')
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      const deleteMessage = async(id) =>{
        try {
            let data = await axios.delete(`/contact/delete/` + id)
            if(data.status == 200){
                const res = msg.filter((msg) => msg._id !== id);
                setMsg(res);
                setSuccess('Delete Success')
            }
        } catch (e) {
            console.log(e);
        }
      }

      const deleteHandler = (id) =>{
        deleteMessage(id)
      }


      


  return (
    <div className="h-screen bg-black flex items-center justify-center p-4">
      <div className=" overflow-x-auto w-full">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <h1 className=' text-yellow-400 font-serif text-2xl text-center'>Message Table</h1>
          <button onClick={downloadExcel} className="bg-yellow-400 text-black py-2 px-4 rounded mb-4">
            Download Excel
          </button>

            {!!success && (
                <div className="bg-yellow-100 float-end w-72 border border-yellow-400 text-white-400 px-4 py-3 rounded relative text-center" role="alert">
                    <span className="block sm:inline">{success}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                        className="fill-current h-6 w-6 text-yellow-500"
                        role="button"
                        onClick={() => setSuccess('')}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                    </span>
                </div>
                )}

          <div className=' overflow-hidden' >
            <table className="min-w-full cursor-pointer text-white text-left text-sm md:text-lg font-light text-surface dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-2 md:px-6 py-4">No</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Name</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Email</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Phone</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Whatsapp</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Message</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Date</th>
                </tr>
              </thead>
              {              
                      msg && msg.length > 0 ? (
                        msg.map((msg,i)=>{
                          return(
                            <tbody>
                              <tr key={msg._id} className="border-b border-neutral-200 dark:border-white/10">
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4 font-medium">{i+1}</td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4">{msg.name}</td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4">{msg.email}</td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4">{msg.phone}</td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4">{msg.whatsapp}</td>
                                  <td className="whitespace-nowrap w-32 px-2 md:px-6 py-4 ">
                                      <div className="relative group">
                                          <p className="truncate max-w-xs">{msg.message}</p>
                                          <span className="hidden group-hover:block absolute bg-black text-white text-xs rounded py-1 px-4 z-10">
                                              {msg.message}
                                          </span>
                                      </div>
                                  </td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4">{formatDate(msg.createdAt)}</td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4 text-yellow-300">
                                      <Link to={`/admin-panel/message-detail/${msg._id}`} >
                                      Detail
                                      </Link>
                                  </td>
                                  <td className="whitespace-nowrap px-2 md:px-6 py-4 text-red-600">
                                      <button onClick={()=>deleteHandler(msg._id)}>
                                      Delete
                                      </button>
                                  </td>
                              </tr>
                              </tbody>
                          )
                      })
                      ) : (
                        <p className=' text-white text-center w-full'> There is no message</p>
                      )                        
                    }             
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
