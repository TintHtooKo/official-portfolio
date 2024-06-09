import axios from '../helper/axios'
import React, { useState } from 'react'

export default function Contact() {
    let [name,setName] = useState('')
    let [email,setEmail] = useState('')
    let [phone,setPhone] = useState('')
    let [whatsapp,setWhatsapp]= useState('')
    let [message,setMessage] = useState('')
    let [error,setError] = useState(null)
    let [success,setSuccess] = useState(null)

    const ContactCreate = async(e) =>{
        try {
            e.preventDefault();
            let data = {
                name,
                email,
                phone,
                whatsapp,
                message
            }
            let contact = await axios.post('/contact/create',data)
            if(contact.status == 200){
                setName('')
                setEmail('')
                setPhone('')
                setWhatsapp('')
                setMessage('')
                setSuccess('Thank you for your message. I will reply you soon. Have a nice day');
            }
        } catch (e) {
            console.log(e);
        }
    }

  return (
    <div className="isolate bg-black px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        </div>
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-yellow-400 sm:text-4xl">Easy To Contact</h2>
        </div>


        {!!success && (<div className="flex justify-center items-center w-full mt-6">
            <div className="w-96 bg-green-500 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline bg-green-500 text-white items-center">{success}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                onClick={() => setSuccess('')}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
            </div>
        </div>
        )}


        <form onSubmit={ContactCreate} method="POST" className="mx-auto max-w-xl sm:mt-10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-white">Name</label>
                <div className="mt-2.5">
                <input value={name} onChange={e=>setName(e.target.value)}  type="text" placeholder='John' name="name" id="name" autoComplete="organization" className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">Email</label>
                <div className="mt-2.5">
                <input value={email} onChange={e=>setEmail(e.target.value)}  type="email" placeholder='test@gmail.com' name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-white">Phone</label>
                <div className="mt-2.5">
                <input value={phone} onChange={e=>setPhone(e.target.value)}  type="phone" name="phone" id="phone" placeholder='+959' autoComplete="phone" className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-white">Whatsapp</label>
                <div className="mt-2.5">
                <input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)}  type="phone" name="phone" id="phone" placeholder='+959' autoComplete="phone" className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">Message</label>
                <div className="mt-2.5">
                <textarea value={message} onChange={e=>setMessage(e.target.value)}  name="message" id="message" rows="4" className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>
            
            <div className="mt-10">
            <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
            </div>
            </div>
        </form>
        </div>
  )
}
