import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PositionEdit() {
  let {id} = useParams()
  let navigate = useNavigate()
  let [data,setData] = useState('')

  useEffect(()=>{
    let fetchPosition = async() =>{
      try {
        let res = await axios.get(`/position/detail/${id}`)
        setData(res.data.position);
      } catch (e) {
        console.log(e);
      }
    }
    fetchPosition()
  },[id])

  const updateHandler = async(e) =>{
    try {
      e.preventDefault()
      let result = {position : data}
      let res = await axios.patch(`/position/update/${id}`,result)
      if(res.status == 200){
        setData(res.data)
        navigate('/admin-panel/profile')
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex h-screen bg-black min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Position Edit
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={updateHandler}  className="space-y-6">

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
              Position
            </label>
            <div className="mt-2">
              <input
              value={data}
              onChange={e=>setData(e.target.value)}
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
