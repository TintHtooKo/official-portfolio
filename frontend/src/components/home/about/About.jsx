import React, { useEffect } from 'react'
import './About.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function About() {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (
    <div className='about' data-aos='flip-right' id='about'>
      <h1>About Me</h1>
      <div>
        <h3>As a Web developer, I specialize in <span style={{color:'yellow'}}>PHP, Django, MERN, and WordPress</span>. I also possess a firm grasp on <span style={{color:'yellow'}}>HTML, CSS, Bootstrap, Tailwind and JavaScript</span>, making me a versatile and well-rounded developer with experience in both <span style={{color:'yellow'}}>front-end and backend development</span>. I'm passionate about creating clean, well-designed, and user-friendly websites that deliver a seamless experience. I also possess strong problem-solving and analytical skills and an ability to adapt to challenging situations and meet deadlines.
In conclusion, To become a professional programmer with an opportunity to apply my skills and knowledge in programming technology and also achieve a responsible and challenging career.</h3>
      </div>
    </div>
  )
}