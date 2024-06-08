import React, { useEffect, useState } from 'react'
import './css/Admin.css'
import axios from '../helper/axios'
import * as XLSX from 'xlsx'
import { useNavigate, useParams } from 'react-router-dom'


export default function Admin() {
  let [data,setData] = useState([])
  let [msg,setMsg] = useState(null)


  useEffect(()=>{
    let fetchUser = async()=>{
      let user = await axios('/user')
      
      let users = user.data
      setData(users);
    }
    fetchUser()
  },[])

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((user, index) => ({
      No: index + 1,
      Name: user.name,
      Email: user.email,
      Role: user.role.role,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };


  // usePrams id nae ka undefined phit nay loh d lo use lite tal
  const deleteUser = async(id) =>{
    try {
      const res = await axios.delete(`/user/delete/` + id)
      if(res.status == 200){
        const updatedData = data.filter((user) => user._id !== id);
        setData(updatedData);
        setMsg("User Deleted Successfully")
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleDeleteClick = (id) => {
    deleteUser(id);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center p-4">
      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <h1 className=' text-yellow-400 font-serif text-2xl text-center'>All User Table</h1>
          <button onClick={downloadExcel} className="bg-yellow-400 text-black py-2 px-4 rounded mb-4">
            Download Excel
          </button>

          {!!msg && (
              <div className="bg-yellow-100 float-end w-72 border border-yellow-400 text-white-400 px-4 py-3 rounded relative text-center" role="alert">
                <span className="block sm:inline">{msg}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-yellow-500"
                    role="button"
                    onClick={() => setMsg('')}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}

          <div className="overflow-hidden">
            <table className="min-w-full text-white text-left text-sm md:text-lg font-light text-surface dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-2 md:px-6 py-4">No</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Name</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Email</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Role</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Edit</th>
                  <th scope="col" className="px-2 md:px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  data && data.map((data,i) =>{
                    return(
                      <tr key={data._id} className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap px-2 md:px-6 py-4 font-medium">{i+1}</td>
                        <td className="whitespace-nowrap px-2 md:px-6 py-4">{data.name}</td>
                        <td className="whitespace-nowrap px-2 md:px-6 py-4">{data.email}</td>
                        <td className="whitespace-nowrap px-2 md:px-6 py-4">{data.role.role}</td>
                        <td className="whitespace-nowrap px-2 md:px-6 py-4 text-yellow-400">Edit</td>
                        <td className="whitespace-nowrap px-2 md:px-6 py-4 text-red-600">
                          <button onClick={() => handleDeleteClick(data._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}
