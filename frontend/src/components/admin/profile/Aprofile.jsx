import React, { useEffect, useState } from 'react'
import './Aprofile.css'
import { Link, useParams } from 'react-router-dom'
import axios from '../../../helper/axios'

export default function Aprofile() {
    let {id} = useParams()
    let [pro,setPro] = useState([])
    let [position,setPosition] = useState([])
    let [data,setData] = useState([])

    useEffect(()=>{
        let fetchPosition = async()=>{
            try {
                let data = await axios.get('/position')
                setPosition(data.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchPosition()
    },[])

    useEffect(()=>{
        let fetchProfile = async()=>{
            try {
                let data = await axios.get('/me')
                setPro(data.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchProfile()
    },[])

    const deleteHandler = async (id) => {
        try {
            let response = await axios.delete(`/position/delete/${id}`);
            console.log('Delete response:', response);
            if (response.status === 200) {
                setPosition((prevPositions) => prevPositions.filter((p) => p._id !== id));
            }
        } catch (e) {
            console.log('Error deleting position:', e);
        }
    };

    const deletePosition = (id) =>{
        deleteHandler(id)
    }

    useEffect(()=>{
        let fetchData = async()=>{
            let res = await axios.get('/personal')
            setData(res.data)
        }
        fetchData()
    },[])


  return (

    <div className=' p-profile bg-black'>
        <div>
        {
            pro && pro.map((p,i)=>(
                <div key={i}>
                    <img className=' w-28 h-28 rounded-full' src={import.meta.env.VITE_BACKEND_URL_ACCESS + p.profile}/>
                    <p className=' text-white font-bold text-2xl mb-5'>{p.name}</p>
                    <Link className='p-btn' to={`/admin-panel/edit-name-image/${p._id}`}>Image and Name Edit</Link>
                </div>
            ))
        }

<hr style={{color : 'gray'}} className=' mt-10' />

        <div className=' p-position '>
        <div className=' pos mb-5'>
        {
            position && position.map((p,i)=>(
                <div className=' flex  space-x-5 mt-10' key={i}>
                <p className=' text-white font-bold text-2xl'>{p.position}</p>
                <Link to={`/admin-panel/edit-position/${p._id}`} className='p-btn'>Edit</Link>
                <button onClick={()=>deletePosition(p._id)} className='delete-btn text-white'>Delete</button>
                </div>
            ))
        }
        </div>
        <Link to='/admin-panel/edit-create' className=' new p-btn ms-5 '>Add New Position</Link>
        </div>

    
        <hr style={{color : 'gray'}} className=' mt-10' />

        {
            data && data.map((d,i)=>(
                <div key={i}>
                    <h1 className=' text-yellow-300 mx-10 text-center font-bold text-3xl mt-5'>Personal Data</h1>
                    <p className=' text-white mt-2'>Email : {d.email}</p>
                    <p className=' text-white mt-2'>Whatsapp : {d.whatsapp}</p>
                    <p className=' text-white mt-2 mb-5'>Phone : {d.phone}</p>
                    <Link to={`/admin-panel/edit-data/${d._id}`} className=' btn'>Edit</Link>
                </div>
            ))
        }

        </div>
    </div>

  )
}
