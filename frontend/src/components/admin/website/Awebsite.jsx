import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Awebsite.css'
import axios from '../../../helper/axios'


export default function Awebsite() {
    let [data,setData] = useState([])

    useEffect(()=>{
        let fetchWebsite = async()=>{
            try {
                let res = await axios.get('/website')
                setData(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchWebsite()
    },[])

    const deleteWebsite = async(id) =>{
        try {
            let res = await axios.delete(`/website/delete/` + id)
            if(res.status == 200){
                const del = data.filter((d) => d._id !== id);
                setData(del);
            }
        } catch (e) {
            console.log(e);
        }
      }

      const deleteHandler = (id) =>{
        deleteWebsite(id)
      }
  return (
    <div>
        <h1 className=' text-white text-3xl font-bold text-center mt-10'>Website Portfolio</h1>
        <Link to='/admin-panel/add-website' className=' btn mx-32'>Create</Link>
        <div className=' website mt-10'>
            {data && data.map((d,i)=>{
                return(
                    <div key={i}>
                        <div>
                            <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + d.image}/>
                            <p className=' text-xl text-white'>{d.name}</p>
                        </div>
                        <div className=' space-x-4 mt-3'>
                                <Link to={`/admin-panel/edit-website/${d._id}`} className=' btn'>Edit</Link>
                                <button onClick={()=>deleteHandler(d._id)} className=' delete-btn'>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
