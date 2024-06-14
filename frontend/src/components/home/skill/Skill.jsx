import React, { useEffect, useState } from 'react'
import './Skill.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import SkillBar from '../../skillBar/SkillBar'
import axios from 'axios'

export default function Skill() {
  let [data,setData] = useState([])
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  useEffect(()=>{
    let fetchSkill = async()=>{
      let res = await axios.get('/skillbar')
      setData(res.data);
    }
    fetchSkill()
  },[])
  return ( 
    <div className='skill' id='skills'>
      <h1 data-aos='zoom-out' className='mb-3'>Skills</h1>
      <div className=' me-5 mx-5 skillBar'>
        {
          data && data.map((d,i)=>{
            return (
              <div key={i}>
                <SkillBar skillName={d.name} proficiency={d.percent}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}