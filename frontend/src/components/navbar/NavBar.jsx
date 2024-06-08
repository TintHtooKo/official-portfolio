import React, { useContext } from 'react'
import './NavBar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import LOGO from '../../assets/me.png'




export default function NavBar() {
  let navigate = useNavigate()
  let {user,dispatch} = useContext(AuthContext)
  const isAdmin = user && user.role && user.role.role === 'admin'
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
      <div className=' flex items-center justify-evenly mx-5 pt-4 text-white'>
        <div>
          <Link className='font-bold text-3xl text-yellow-400' to='/' onClick={handleNavLinkClick}>
            <img className='img' src={LOGO} alt="" />
          </Link>
        </div>
        <div className=' navbar relative bottom-5'>
          <div>
          <ul className='flex space-x-10'>
            {!!user && <li>
              <NavLink
                to='/knowledge'
                className={({ isActive }) =>
                  isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }
                onClick={handleNavLinkClick}
              >
                Knowledge
              </NavLink>
            </li>}

            {!!user && <li>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }
                onClick={handleNavLinkClick}
              >
                Contact
              </NavLink>
            </li>}
            </ul>
          </div>

          {/* for admin nav bar */}
          <div>
          {!!isAdmin &&  <ul>
              <li>
                <Link to='/admin-panel'>AdHome</Link>
              </li>
            </ul>}
          </div>
          </div>
          
          <div className=' relative bottom-5'>
            <ul>
            {!user ? (<li className=' btn'>
                <NavLink
                  to='/login'
                >
                  Login
                </NavLink>
              </li>) : (
                <li>
                  <button onClick={LogoutHandler} className='btn'>
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
