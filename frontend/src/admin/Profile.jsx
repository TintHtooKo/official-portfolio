import React from 'react'
import Aprofile from '../components/admin/profile/Aprofile'
import Askill from '../components/admin/skill/Askill'
import './css/Profile.css'
import Aproject from '../components/admin/project/Aproject'

export default function Profile() {
  return (
    <div className=' bg-black'>
        <div className=' space bg-black h-36'>

        </div>
        <Aprofile/>
        <hr style={{color : 'gray'}} className=' mt-10' />
        <Askill/>
        <hr style={{color : 'gray'}} className=' mt-10' />
        <Aproject/>
        <hr style={{color : 'gray'}} className=' mt-10' />
    </div>
  )
}
