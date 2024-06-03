import React from 'react'
import './css/Knowledge.css'
import Demo from '../assets/php.png'
import { Link } from 'react-router-dom'

export default function Knowledge() {
    const handleNavLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
  return (
    <div className=' knowledge bg-black'>

        {/* for category */}
        <div className='text-center mt-20 '>
            <div className=' category fixed mx-5 pt-2 rounded-lg bg-slate-600'>
                <h1 className=' mt-5 font-serif text-lg cursor-default text-yellow-400'>Category</h1>
                <div className=' mx-20 mt-4 flex space-x-3'>
                    <input type="checkbox" />
                    <p className=' text-white'>All</p>
                </div>
                <div className=' mx-20 mt-4 flex space-x-3'>
                    <input type="checkbox" />
                    <p className=' text-white'>Blog</p>
                </div>
                <div className=' mx-20 mt-4 flex space-x-3 '>
                    <input type="checkbox" />
                    <p className=' text-white'>Knowledge</p>
                </div>
                <div className=' mx-20 mt-4 flex space-x-3'>
                    <input type="checkbox" />
                    <p className=' text-white'>Other</p>
                </div>
            </div>
        </div>

        {/* for post */}
        <div className=' mt-20 flex flex-col space-y-10 post text-center'>
            {/* <h1 className=' m-auto font-bold text-7xl mt-52 text-yellow-400 text-pop-up-top'>Comming Soon</h1> */}
            <div className=' bg-slate-600 p-8 space-y-5 rounded-lg '>
                <h1 className=' font-bold text-2xl text-white text-start'>Header</h1>
                <p className=' text-white text-start'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, placeat tenetur! 
                    Aliquid autem nisi cumque quo voluptatibus! Corporis vero quod, ea, nobis magnam 
                    alias eum dolorum, neque similique recusandae aliquid?Lorem ipsum dolor sit amet 
                    consectetur, adipisicing elit. Eum, ...... {' '}
                    <Link to='/detail/234' onClick={handleNavLinkClick} className=' font-semibold leading-6 text-yellow-400 hover:text-indigo-500'>see more</Link>
                    </p>
                <img className=' rounded-md' src={Demo} alt="" />
            </div>

            <div className=' bg-slate-600 mt-5 p-8 space-y-5 rounded-lg '>
                <h1 className=' font-bold text-2xl text-white text-start'>Header</h1>
                <p className=' text-white text-start'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, placeat tenetur! 
                    Aliquid autem nisi cumque quo voluptatibus! Corporis vero quod, ea, nobis magnam 
                    alias eum dolorum, neque similique recusandae aliquid?Lorem ipsum dolor sit amet 
                    consectetur, adipisicing elit. Eum, ...... {' '}
                    <Link to='/detail/234' onClick={handleNavLinkClick}  className=' font-semibold leading-6 text-yellow-400 hover:text-indigo-500'>see more</Link>
                    </p>
                <img className=' rounded-md' src={Demo} alt="" />
            </div>

            <div className=' bg-slate-600 mt-5 p-8 space-y-5 rounded-lg '>
                <h1 className=' font-bold text-2xl text-white text-start'>Header</h1>
                <p className=' text-white text-start'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, placeat tenetur! 
                    Aliquid autem nisi cumque quo voluptatibus! Corporis vero quod, ea, nobis magnam 
                    alias eum dolorum, neque similique recusandae aliquid?Lorem ipsum dolor sit amet 
                    consectetur, adipisicing elit. Eum, ...... {' '}
                    <Link to='/detail/234' onClick={handleNavLinkClick}  className=' font-semibold leading-6 text-yellow-400 hover:text-indigo-500'>see more</Link>
                    </p>
                <img className=' rounded-md' src={Demo} alt="" />
            </div>

        </div>

        {/* other */}
        <div className=' other text-center mt-20 me-5 rounded-lg text-white bg-slate-600 h-screen '>
            <div>hello</div>
        </div>
    </div>
  )
}
