import React, { useEffect } from 'react'
import './Hero.css'
import { Typewriter } from 'react-simple-typewriter';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Profile from '../../../assets/pro.jpg'

export default function Hero() {
    useEffect(()=>{
        Aos.init({duration:2000});
      })
      return (
        <div className='hero' data-aos="fade-down" id='hero'>
          <div className=' mt-20'>
          <div className='image'><img src={Profile}/></div>
          <div className='me'>
            <h1 style={{color:'white'}}>My name is Tint Htoo Ko</h1>
            <h1 style={{color:'white'}} >I am {' '} 
              <span style={{color:'yellow'}}> '
                <Typewriter 
                words={['Web Developer','FullStack Developer']} 
                loop={true} 
                cursor 
                typeSpeed={120}
                deleteSpeed={150}
                delaySpeed={400}
                />
              '
              </span>
            </h1>
          </div>
          </div>
        </div>
      )
}
