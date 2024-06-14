import axios from '../helper/axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Admin.css'

export default function SkillAdd() {
    let [name,setName] = useState('')
    let [percent,setPercent] = useState(0)
    let navigate = useNavigate()

    const AddSkillHandler = async(e) =>{
        try {
            e.preventDefault()
            let data = {name,percent}
            let res = await axios.post('/skillbar/create',data)
            if(res.status == 200){
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
          Add New Skill
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mob-admin">
        <form onSubmit={AddSkillHandler} className="space-y-6">

          <div>
            <label htmlFor="skill" className="block text-sm font-medium leading-6 text-white">
              Skill
            </label>
            <div className="mt-2">
              <input
              value={name}
              onChange={e=>setName(e.target.value)}
                id="skill"
                name="skill"
                type="text"
                autoComplete="skill"
                required
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="percent" className="block text-sm font-medium leading-6 text-white">
              Percent <br /> {percent}%
            </label>
            <div className="mt-2">
              <input
              value={percent}
              onChange={e=>setPercent(e.target.value)}
                id="percent"
                name="percent"
                min='0'
                max='100'
                type="range"
                autoComplete="percent"
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
