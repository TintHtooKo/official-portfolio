import React from 'react'
import Hero from '../components/home/hero/Hero'
import About from '../components/home/about/About'
import Skill from '../components/home/skill/Skill'
import Portfolio from '../components/home/portfolio/Portfolio'
import ContactMail from '../components/home/contact/contactMail'

export default function Home() {
  return (
    <div className=' bg-black'>
        <Hero/>
        <hr style={{color : 'gray'}} className=' mt-10' />
        <About/>
        <hr style={{color : 'gray'}} className=' mt-10' />
        <Skill/>
        <hr style={{color : 'gray'}} className=' mt-10' />
        <Portfolio/>
        <hr style={{color : 'gray'}} className=' mt-10' />
        <ContactMail/>
    </div>
  )
}
