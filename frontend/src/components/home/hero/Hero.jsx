import React, { useEffect, useState } from 'react';
import './Hero.css';
import { Typewriter } from 'react-simple-typewriter';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from '../../../helper/axios';

export default function Hero() {
  const [data, setData] = useState([]);
  const [positions, setPositions] = useState([]);

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

    // <div data-aos="fade-down">
    //   <div>
    //   {
    //       data && data.map((d,i)=>(
    //         <div key={i} className='image'><img src={import.meta.env.VITE_BACKEND_URL_ACCESS + d.profile} alt="Profile" /></div>
    //       ))
    //     }
    //   </div>
    // </div>



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
      </div>
    </div>
  );
}
