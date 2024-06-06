
import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  let [name,setName] = useState('')
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [cpassword,setCpassword] = useState('')
  let [userRole,setUserRole] = useState('user')
  let [role,setRole] = useState([])
  let [ error,setError] = useState(null)
  let navigate = useNavigate()

  useEffect(()=>{
    let fetchData = async() =>{
      try {
        let data = await axios.get('/role')
        setRole(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  },[])

  const RegisterHandler = async(e) =>{
    try {
      e.preventDefault()
      let data = {
        name,
        email,
        password,
      }
      if(password != cpassword){
        setError("Password does not match. Please Try again");
      }else{
        let result = await axios.post('/user/create',data,{
          withCredentials : true
        })
      if(result.status == 200){
        navigate('/login')
      }
      }
    } catch (e) {
      setError(e.response.data.msg);
    }
  }


  return (
    <>
      <div className="flex bg-black min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={RegisterHandler}  className="space-y-6" action="#" method="POST">
          
          {!!error && <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded relative" role="alert">
            <strong className="font-bold bg-red-100">Error! </strong>
            <span className="block sm:inline bg-red-100">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={()=>!setError()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>}

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
              Your Name
            </label>
            <div className="mt-2">
              <input
              value={name}
              onChange={e=>setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
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
                onChange={e=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <select className=' text-black hidden'>
              {role && role.map((r)=>(
                <option key={r._id} value={userRole} onChange={(e)=>setUserRole(e.target.value)}>{r.role}</option>
              ))}
            </select>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                value={password}
                onChange={e=>setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-white">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                value={cpassword}
                onChange={e=>setCpassword(e.target.value)}
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="current-password"
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
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            Already Register ? {' '}
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
