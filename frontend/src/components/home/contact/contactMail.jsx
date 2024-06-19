import React, { useEffect, useState } from 'react'
import './contactMail.css'
import Img from '../../../assets/contact.png'
import axios from '../../../helper/axios'

export default function ContactMail() {
  let [data,setData] = useState([])
  useEffect(()=>{
    let fetchData = async()=>{
      let res = await axios.get('/personal')
      setData(res.data);
    }
    fetchData()
  },[])

  return (
    <div className='contact cursor-pointer  text-white'>
        <img src={Img} alt="" />
        {
          data && data.map((d,i)=>{
            return(
              <div key={i}>
              <p>Email : <span className='text-yellow-300'>{d.email}</span></p>
              <p>Whatsapp : <span className='text-yellow-300'>{d.whatsapp}</span></p>
              <p>Phone : <span className='text-yellow-300'>{d.phone}</span></p>
              </div>
            )
          })
        }
    </div>
  )
}
