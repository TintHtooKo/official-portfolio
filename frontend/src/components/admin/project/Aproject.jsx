import React, { useEffect, useState } from 'react'
import './Aproject.css'
import { Link, useParams } from 'react-router-dom'
import axios from '../../../helper/axios'

export default function Aproject() {
    let [data,setData] = useState([])
    let {id} = useParams()

    useEffect(()=>{
        let fetchProject = async()=>{
            try {
                let res = await axios.get('/project')
                setData(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchProject()
    },[])

    const deleteHandler = async (id) => {
        try {
            let response = await axios.delete(`/project/delete/${id}`);
            console.log('Delete response:', response);
            if (response.status === 200) {
                setData((prevData) => prevData.filter((p) => p._id !== id));
            }
        } catch (e) {
            console.log('Error deleting position:', e);
        }
    };

    const deleteProject = (id) =>{
        deleteHandler(id)
    }

  return (
    <div className='portfolio'>
      <h1>Projects</h1>

      <div className='list me-4 mx-4'>

        {
            data && data.map((d,i)=>{
                return(
                    <div key={i}  className='detail'>
                        <a href={d.link}><img src={import.meta.env.VITE_BACKEND_URL_ACCESS + d.image}/></a>
                        <p>{d.name}</p>
                        <button onClick={()=>deleteProject(d._id)} className=' text-white delete-btn'>Delete</button>
                    </div>
                )
            })
        }

      </div>
      
        <div className='more'>
          <Link to='/admin-panel/add-project' className=' btn'>Create</Link>
        </div>
    </div>
  )
}
