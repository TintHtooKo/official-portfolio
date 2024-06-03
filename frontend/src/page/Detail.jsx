import React from 'react'
import './css/Detail.css'
import Demo from '../assets/php.png'

export default function Detail() {
  return (
    <div className=' postDetail bg-black'>
        <div className="one"></div>

            <div className=' post bg-slate-600 mt-20 p-8 space-y-5 rounded-lg '>
                <h1 className=' font-bold text-2xl text-white text-start'>Header</h1>
                <p className=' text-white text-start'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, placeat tenetur! 
                    Aliquid autem nisi cumque quo voluptatibus! Corporis vero quod, ea, nobis magnam 
                    alias eum dolorum, neque similique recusandae aliquid?Lorem ipsum dolor sit amet 
                    consectetur, adipisicing elit. Eum,
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, placeat tenetur! 
                    Aliquid autem nisi cumque quo voluptatibus! Corporis vero quod, ea, nobis magnam 
                    alias eum dolorum, neque similique recusandae aliquid?Lorem ipsum dolor sit amet 
                    consectetur, adipisicing elit. Eum,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, placeat tenetur! 
                    Aliquid autem nisi cumque quo voluptatibus! Corporis vero quod, ea, nobis magnam 
                    alias eum dolorum, neque similique recusandae aliquid?Lorem ipsum dolor sit amet 
                    consectetur, adipisicing elit. Eum,
                </p>
                <img className=' rounded-md' src={Demo} alt="" />
                <div className=' flex items-center'>
                    <input type="text" className=' rounded-md h-8 w-3/4 ps-3 ' />
                    <button className=' mx-10 border w-28 h-8 rounded-md text-black font-bold font-seri border-yellow-400 bg-yellow-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600'>send</button>
                </div>
            </div>
            


        <div className="one"></div>
    </div>
  )
}
