import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddWebsite() {
    let {id} = useParams()
    let [name,setName] = useState('')
    let [link,setLink] = useState('')
    let [file,setFile] = useState('')
    let [preview,setPreview] = useState(null)
    let navigate = useNavigate()

    useEffect(()=>{
        let fetchWebsite = async() =>{
            if(id){
                let res = await axios.get('/website/detail/'+id)
                if(res.status == 200){
                    setName(res.data.name)
                    setLink(res.data.link)
                    setPreview(import.meta.env.VITE_BACKEND_URL_ACCESS + res.data.image)
                }
            }
        }
        fetchWebsite()
    },[id])

    let CreateWebsite = async(e) =>{
        try {
            e.preventDefault()
            let data = {name,link}
            let res;
            if(id){
                res = await axios.patch('/website/update/'+id,data)
            }else{
                res = await axios.post('/website/create',data)
            }
            if(res.status == 200){
                // let webId = res.data._id
                if(file){
                    let formData = new FormData()
                    formData.set('image',file)
                    let uploadRes = await axios.post(`/website/upload/${id}`  ,formData,{
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
          {id ? 'Update' : 'Add'} Website Portfolio
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={CreateWebsite}  className="space-y-6">

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
            <label htmlFor="link" className="block text-sm font-medium leading-6 text-white">
              Link
            </label>
            <div className="mt-2">
              <input
              value={link}
              onChange={e=>setLink(e.target.value)}
                id="link"
                name="link"
                type="text"
                autoComplete="link"
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
              {id ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
