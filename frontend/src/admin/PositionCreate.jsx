import { useNavigate } from 'react-router-dom'
import axios from '../helper/axios'
import React, { useState } from 'react'

export default function PositionCreate() {
    let [position,setPosition] = useState('')
    let navigate = useNavigate()

    const PositionCreateHandler = async(e) =>{
        try {
            e.preventDefault()
            let data = {position}
            let res = await axios.post('/position/create/',data)
            if(res.status == 200){
                setPosition(res)
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
          Position Create
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  onSubmit={PositionCreateHandler} className="space-y-6">

          <div>
            <label htmlFor="position" className="block text-sm font-medium leading-6 text-white">
              Position
            </label>
            <div className="mt-2">
              <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
                id="position"
                name="position"
                type="position"
                autoComplete="position"
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
