import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function DataEdit() {
    let {id} = useParams()
    let [email,setEmail] = useState('')
    let [phone,setPhone] = useState('')
    let [whatsapp,setWhatsapp] = useState('')
    let [file,setFile] = useState('')
    let navigate = useNavigate()

    useEffect(()=>{
        let fetchData = async()=>{
            if(id){
                let res = await axios.get('/personal/detail/'+id)
                setEmail(res.data.email)
                setPhone(res.data.phone)
                setWhatsapp(res.data.whatsapp)
                setFile(import.meta.env.VITE_BACKEND_URL_ACCESS + res.data.cv)
            }
        }
        fetchData()
    },[id])
    
    let editData = async(e) =>{
        try {
            e.preventDefault()
        let data = {email,phone,whatsapp}
        let res = await axios.patch('/personal/update/'+id,data)
        if(res.status == 200){
            // let webId = res.data._id
            if(file){
                let formData = new FormData()
                formData.set('cv',file)
                let uploadRes = await axios.post(`/personal/upload/${id}`  ,formData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                console.log(uploadRes);
            }
            navigate('/admin-panel/profile')
        }
        } catch (e) {
            console.log(e);
        }
    }


    let upload = (e) =>{
        let file = e.target.files[0]
        setFile(file)
    }


  return (
    <div className="flex bg-black min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Edit Data
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={editData}  className="space-y-6">

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
              value={email}
              onChange={e =>setEmail(e.target.value)}
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium leading-6 text-white">
              Whatsapp
            </label>
            <div className="mt-2">
              <input
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="whatsapp"
                required
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
              Phone
            </label>
            <div className="mt-2">
              <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
                id="phone"
                name="phone"
                type="tel"
                autoComplete="phone"
                required
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cv" className="block text-sm font-medium leading-6 text-white">
              Cv
            </label>
            <div className="mt-2">
              <input
              onChange={upload}
                id="cv"
                name="cv"
                type="file"
                autoComplete="cv"
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
