import React, { useEffect, useState } from 'react'
import SkillBar from '../../skillBar/SkillBar'
import './Askill.css'
import axios from '../../../helper/axios'
import { Link, useParams } from 'react-router-dom'
import Aos from 'aos';
import 'aos/dist/aos.css'

export default function Askill() {
    let {id} = useParams()
    let [data,setData] = useState([])

    useEffect(()=>{
        Aos.init({duration:2000})
      })

    useEffect(()=>{
        let fetchSkill = async() =>{
            let res = await axios.get('/skillbar')
            setData(res.data)
        }
        fetchSkill()
    },[])

    const deleteSkill = async(id) =>{
        try {
            let res = await axios.delete(`/skillbar/delete/` + id)
            if(res.status == 200){
                const del = data.filter((d) => d._id !== id);
                setData(del);
            }
        } catch (e) {
            console.log(e);
        }
      }

      const deleteHandler = (id) =>{
        deleteSkill(id)
      }


  return (
    <div className='skill bg-black h-full' id='skills'>
      <h1 className='mb-3'>Skills</h1>
      <Link to='/admin-panel/skill-add' className=' btn relative bottom-4 left-4'>Add New</Link>
      <div className=' mb-10 mx-5 skillBar cursor-pointer'>
            {
                data && data.map((d,i)=>{
                    return(
                        <div key={i}>
                            <SkillBar skillName={d.name} proficiency={d.percent}/>
                            <Link to={`/admin-panel/skill-edit/${d._id}`} className=' p-btn mx-3'>Edit</Link>
                            <button onClick={()=>deleteHandler(d._id)} className=' delete-btn mt-2'>delete</button>
                        </div>
                    )
                })
            }
        </div>
      
    </div>
  )
}
