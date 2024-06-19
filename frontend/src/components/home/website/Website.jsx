import React, { useEffect, useState } from 'react'
import './Website.css'
import Demo from '../../../assets/reflesia.png'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import axios from '../../../helper/axios'

export default function Website() {
  let [data,setData]  = useState([])
  useEffect(()=>{
    let fetchWebsite = async()=> {
      try {
        let data = await axios.get('/website')
        setData(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchWebsite()
  },[])
  return (
    <div>
        <h1 className=' text-white text-3xl font-bold text-center mt-10'>Website Portfolio</h1>
        <div className=' mt-10'>
            <Carousel 
            showStatus={false} 
            showThumbs={false}  
            infiniteLoop={true} 
            autoPlay={true}
            interval={4000}>
                {
                  data && data.map((d,i)=>{
                    return(
                      <div key={i}>
                          <a href={d.link} target="_blank" rel="noopener noreferrer">
                            <div className='image-container'>
                                <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + d.image}/>
                                <p className=' text-white'>{d.name}</p>
                            </div>
                          </a>
                      </div>
                    )
                  })
                }
            </Carousel>
        </div>
    </div>
  )
}
