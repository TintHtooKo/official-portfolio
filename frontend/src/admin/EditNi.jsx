import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditNi() {
    let [name,setName] = useState('')
    let [preview,setPreview] = useState(null)
    let [file,setFile] = useState('')
    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        let fetchProfile = async()=>{
            if(id){
                let data = await axios.get(`/me/detail/${id}`)
                setPreview(import.meta.env.VITE_BACKEND_URL_ACCESS + data.data.profile)
                setName(data.data.name);
            }
        }
        fetchProfile()
    },[id])

    let updateHandler = async(e) =>{
        e.preventDefault()
        try {
            let data = {name}
            let res = await axios.patch(`/me/update/${id}`,data)
            if (file) {
                let formData = new FormData()
                formData.set('profile', file)
                let updatePhoto = await axios.post(`/me/upload/${id}`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                console.log(updatePhoto);
                if (updatePhoto.status !== 200) {
                  console.log('update profile failed')
                }
              }


            if (res.status == 200){
                navigate('/admin-panel/profile')
            }
        } catch (e) {
            console.log(e);
        }
    }

    let upload = (e) =>{
        let file = e.target.files[0]
        setFile(file)

        let fileReader = new FileReader
        fileReader.onload = (e) =>{
            setPreview(e.target.result)
        }

        fileReader.readAsDataURL(file)
        
    }

  return (
    <div className="flex bg-black min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Update Name And Image
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  className="space-y-6" onSubmit={updateHandler}>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
              Name
            </label>
            <div className="mt-2">
              <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium leading-6 text-white">
              Image
            </label>
            <div className="mt-2">
              <input
              onChange={upload}
                id="image"
                name="image"
                type="file"
                autoComplete="image"
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {!!preview ? (<img src={preview}/> ):<></>}
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
