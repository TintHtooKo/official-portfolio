import React, { useEffect } from 'react'
import './Skill.css'

import Aos from 'aos'
import 'aos/dist/aos.css'
import SkillBar from '../../skillBar/SkillBar'

export default function Skill() {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (
    <div className='skill' id='skills'>
      <h1 data-aos='zoom-out' className='mb-3'>Skills</h1>
      <div className=' me-5 mx-5 skillBar'>
        <SkillBar skillName="HTML" proficiency={80}/>
        <SkillBar skillName="CSS" proficiency={80}/>
        <SkillBar skillName="Bootstrap" proficiency={80}/>
        <SkillBar skillName="JavaScript" proficiency={60}/>
        <SkillBar skillName="PHP" proficiency={70}/>
        <SkillBar skillName="Wordpress" proficiency={80}/>
        <SkillBar skillName="Laravel" proficiency={55}/>
        <SkillBar skillName="MySql" proficiency={70}/>
        <SkillBar skillName="Python" proficiency={70}/>
        <SkillBar skillName="Django" proficiency={75}/>
        <SkillBar skillName="Sqlite" proficiency={70}/>
        <SkillBar skillName="PostgreSql" proficiency={50}/>
        <SkillBar skillName="React" proficiency={70}/>
        <SkillBar skillName="ExpressJs" proficiency={75}/>
        <SkillBar skillName="MongoDb" proficiency={75}/>
        <SkillBar skillName="NodeJs" proficiency={75}/>
      </div>
    </div>
  )
}