import React from 'react'
import './contactMail.css'
import Img from '../../../assets/contact.png'
import { Link } from 'react-router-dom'

export default function ContactMail() {
  return (
    <div className='contact cursor-pointer  text-white'>
        <img src={Img} alt="" />
        <div>
        <p>Email : <span className='text-yellow-300'>tinthtooko.official18@gmail.com</span></p>
        <p>Whatsapp : <span className='text-yellow-300'>+959769332506</span></p>
        </div>
        <Link to='/contact'>Contact Me</Link>
    </div>
  )
}
