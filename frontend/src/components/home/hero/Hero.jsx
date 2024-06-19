import React, { useEffect, useState } from 'react';
import './Hero.css';
import { Typewriter } from 'react-simple-typewriter';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from '../../../helper/axios';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [data, setData] = useState([]);
  const [positions, setPositions] = useState([]);
  let [cv,setCv] = useState([])

  useEffect(()=>{
    let fetchData = async()=>{
      let res = await axios.get('/personal')
      setCv(res.data)
    }
    fetchData()
  },[])

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await axios.get('/me');
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchName();
  }, []);

  useEffect(() => {
    const fetchPos = async () => {
      try {
        const res = await axios.get('/position');
        setPositions(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPos();
  }, []);
 
  useEffect(() => {
    Aos.init({ duration: 2000 }); 
  }, []);

  const positionWords = positions.map(p => p.position);

  return (
    <div className='hero' data-aos="fade-down" id='hero'>
      <div className='mt-28'>
        {
          data && data.map((d,i)=>(
            <div key={i} className='image'><img src={import.meta.env.VITE_BACKEND_URL_ACCESS + d.profile} alt="Profile" /></div>
          ))
        }
        <div className='me'>
          {data && data.map((n, i) => (
            <h1 key={i} style={{ color: 'white' }}>My name is {n.name}</h1>
          ))}
          {positionWords.length > 0 && (
            <h1 style={{ color: 'white' }}>
              I am {' '}
              <span style={{ color: 'yellow' }}> 
                ' 
                <Typewriter 
                  words={positionWords} 
                  loop={true} 
                  cursor 
                  typeSpeed={120}
                  deleteSpeed={150}
                  delaySpeed={400}
                />
                '
              </span>
            </h1>
          )}
        </div>
        <div className=' mt-5 space-x-5'>
          <Link to='/contact' className='btn'>Hire Me</Link>
          {
            cv && cv.map((c,i)=>(
              <a href={import.meta.env.VITE_BACKEND_URL_ACCESS + c.cv} target="_blank" rel="noopener noreferrer" className='btn' key={i}>See My CV</a>
            ))
          }
        </div>
      </div>
    </div>
  );
}


