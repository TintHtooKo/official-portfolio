import { useParams } from 'react-router-dom'
import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'

export default function MessageDetail() {
    let {id} = useParams()
    let [data,setData] = useState('')

    useEffect(()=>{
        let fetchMsg = async()=>{
            try {
             let res = await axios.get('/contact/detail/'+id)
             setData(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchMsg()
    },[id])

  return (
    <div className="flex bg-black flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Message Detail
          </h2>
        </div>
        <div className=' text-white mt-10 space-y-5 w-auto border border-gray-600 p-10 rounded-lg bg-slate-900'>
            <p>Name</p>
            <p>{data.name}</p>
            <hr style={{color : 'gray'}} className=' mt-10' />
            <p>Email</p>
            <p>{data.email}</p>
            <hr style={{color : 'gray'}} className=' mt-10' />
            <p>phone</p>
            <p>{data.phone}</p>
            <hr style={{color : 'gray'}} className=' mt-10' />
            <p>whatsapp</p>
            <p>{data.whatsapp}</p>
            <hr style={{color : 'gray'}} className=' mt-10' />
            <p>{data.message}</p>
        </div>
        
      </div>
  )
}
