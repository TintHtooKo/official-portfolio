import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserEdit() {
    let [role,setRole] = useState([])
    let [name,SetName] = useState('')
    let [email,setEmail] = useState('')
    let [userRole,setUserRole] = useState('')
    let {id} = useParams()
    let navigate = useNavigate()
    useEffect(()=>{
        let fetchRole = async()=>{
            try {
                let res = await axios.get('/role')
                setRole(res.data);
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchRole()
    },[])

    useEffect(()=>{
        let fetchUser = async()=>{
            try {
                let res = await axios.get('/user/detail/'+id)
                SetName(res.data.name)
                setEmail(res.data.email)
                setUserRole(res.data.role._id)
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchUser()
    },[id])

    const UpdateHandler = async(e) =>{
        try {
            e.preventDefault()
            let data = {
                role:userRole
            }
            let update = await axios.patch('/user/update/' + id, data)
            if(update.status == 200){
                console.log('Updated user data:', update.data);
                navigate('/admin-panel')
            }
        } catch (e) {
            console.error('Error updating user:', e.message)
        }
    }

  return (
    <div className="flex bg-black h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Edit User Role
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={UpdateHandler}  className="space-y-6" action="#" method="POST">

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
              Your Name
            </label>
            <div className="mt-2">
              <input
              value={name}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                readOnly
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                    value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  readOnly
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <select value={userRole} onChange={(e)=>setUserRole(e.target.value)} className=' text-black '>
            {role && role.map((r)=>(
                <option key={r._id} value={r._id} >{r.role}</option>
            ))}
            </select>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
