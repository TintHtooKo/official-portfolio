import React, { useEffect, useState } from 'react'
import './Portfolio.css'
import 'aos/dist/aos.css'
import Aos from 'aos'
import axios from '../../../helper/axios'

export default function Portfolio() {
  let [data,setData] = useState([])

  useEffect(()=>{
    let fetchProject = async() =>{
      try {
        let res = await axios('project')
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProject()
  },[])
 

  useEffect(()=>{
    Aos.init({duration:2000})
  })

  return (
    <div className='portfolio'>
      <h1 data-aos='slide-down'>Project Portfolio</h1>

      <div data-aos='slide-up' className='list me-4 mx-4'>

        {
          data && data.map((d,i)=>{
            return(
              <div key={i}  className='detail'>
                <a href={d.link}><img src={import.meta.env.VITE_BACKEND_URL_ACCESS + d.image}/></a>
                <p>{d.name}</p>
              </div>
            )
          })
        }

      </div>
      
        <div className='more'>
          <a href='https://github.com/tinthtooko' className=' font-serif'>More</a>
        </div>
    </div>
  )
}