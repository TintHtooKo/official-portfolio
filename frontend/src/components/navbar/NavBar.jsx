import React, { useContext, useState } from 'react'
import './NavBar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import LOGO from '../../assets/me.png'
import MENU from '../../assets/menubar.png'




export default function NavBar() {
  let [open,setOpen] = useState(false)
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
    setOpen(!open)
  }

  const handleLogoLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMenu = () =>{
    setOpen(!open)
  }

  const combinedLogoutAndCloseHandler = () => {
    LogoutHandler();
    handleNavLinkClick();
  };

  return (

    <div>
      <div className="nav">
      <div className=' navbar'>

        <div>
          <Link to='/' onClick={handleNavLinkClick}>
            <img src={LOGO} className='img' />
          </Link>
        </div>

        <div className=' menu'>
          <ul>
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

              {!!isAdmin && <li>
                <NavLink to='/admin-panel' className={({ isActive }) =>
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }>AdHome</NavLink>
                </li>}

                {!!isAdmin && <li>
                <NavLink to='/admin-panel/message' className={({ isActive }) =>
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }>Message</NavLink>
                </li>}  

                {!!isAdmin && <li>
                <NavLink to='/admin-panel/profile' className={({ isActive }) =>
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }>Profile</NavLink>
                </li>}              
          </ul>
           </div>

           <div className=' login-btn'>
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


        {/* for mobile */}
        <div className='mobile'>
              <div>
                <Link to='/' onClick={handleLogoLinkClick}>
                  <img src={LOGO} className='mob-img' />
                </Link>
              </div>

              <div>
              <div>
                <img src={MENU} className=' menubar' onClick={toggleMenu}/>
              </div>
              </div>
              </div>         
          </div>
          <div className={`mob-menu bg-black ${open ? 'show' : ''}`}>
                <ul className=' space-y-5'>
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

                {!!isAdmin && <li>
                  <NavLink to='/admin-panel' className={({ isActive }) =>
                      isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                    }
                    onClick={handleNavLinkClick}>AdHome</NavLink>
                  </li>}

                  {!!isAdmin && <li>
                  <NavLink to='/admin-panel/message' className={({ isActive }) =>
                      isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                    }
                    onClick={handleNavLinkClick}>Message</NavLink>
                  </li>}  

                  {!!isAdmin && <li>
                  <NavLink to='/admin-panel/profile' className={({ isActive }) =>
                      isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                    }
                    onClick={handleNavLinkClick}>Profile</NavLink>
                  </li>}
              {!user ? (<li className=' btn'>
                  <NavLink
                    to='/login'
                  >
                    Login
                  </NavLink>
                </li>) : (
                  <li>
                    <button onClick={combinedLogoutAndCloseHandler}  className='btn'>
                      Logout
                    </button>
                  </li>
                )}                                              
                </ul>
          </div>
    </div>

  )
}
