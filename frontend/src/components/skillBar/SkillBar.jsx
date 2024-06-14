import React, { useEffect } from 'react';
import './SkillBar.css'; // Import CSS for styling
import Aos from 'aos';
import 'aos/dist/aos.css'

const SkillBar = ({ skillName, proficiency }) => {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (
    <div data-aos='zoom-in'>
        <h4 className='name'>{skillName}</h4>
        <div className='bar-bg'>
            <div className='bar'  style={{width: proficiency + '%'}}>{proficiency}%</div>
        </div>
    </div>
  ); 
};

export default SkillBar;