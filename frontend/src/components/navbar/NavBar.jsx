import React, { useContext } from 'react'
import './NavBar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'




export default function NavBar() {
  let navigate = useNavigate()
  let {user,dispatch} = useContext(AuthContext)
  const LogoutHandler = async()=>{
    try {
      let logout = await axios.post('/user/logout')
      if(logout.status == 200){
        dispatch({type:'LOGOUT'})
        navigate('/login')
      }
    } catch (e) {
      console.log(e);
    }
  }
  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='nav'>
      <div className='flex items-center justify-between me-5 mx-5 pt-4 text-white'>
        <div>
          <Link className='font-bold text-3xl text-yellow-400' to='/' onClick={handleNavLinkClick}>PORTFOLIO</Link>
        </div>
        <div>
          <ul className='flex space-x-5'>
            <li>
              <NavLink
                to='/knowledge'
                className={({ isActive }) =>
                  isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }
                onClick={handleNavLinkClick}
              >
                Knowledge
              </NavLink>
            </li>
            {!user ? (<li>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }
                >
                  Login
                </NavLink>
              </li>) : (
                <li>
                  <button onClick={LogoutHandler} className='text-white hover:text-yellow-400'>
                    Logout
                  </button>
                </li>
              )}
                 

               

             
          </ul>
        </div>
      </div>
    </div>
  )
}
