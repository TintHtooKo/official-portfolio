import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
import Knowledge from '../page/Knowledge'
import Detail from '../page/Detail'
import Login from '../page/Login'
import Register from '../page/Register'
import { AuthContext } from '../context/AuthContext'
import Contact from '../page/Contact'
import Admin from '../admin/Admin'
import UserEdit from '../admin/UserEdit'
import Message from '../admin/Message'
import MessageDetail from '../admin/MessageDetail'
import Profile from '../admin/Profile'
import EditNi from '../admin/EditNi'
import PositionEdit from '../admin/PositionEdit'
import PositionCreate from '../admin/PositionCreate'
import SkillAdd from '../admin/SkillAdd'
import SkillEdit from '../admin/SkillEdit'

export default function Route() {
    let {user} = useContext(AuthContext)
    const isAdmin = user && user.role && user.role.role === 'admin';
    const router = createBrowserRouter([
      {
        path : '/',
        element : <App/>,
        children : [
          {
            path : '/',
            element : <Home/>,
          },
          {
            path : '/knowledge',
            element : user ? <Knowledge/> : <Login/>,
          },
          {
            path : '/detail/:id',
            element : user ? <Detail/> : <Login/>,
          },
          {
            path : '/contact',
            element : user ? <Contact/> : <Login/>,
          },
          {
            path : '/login',
            element : !user && <Login/>,
          },
          {
            path : '/register',
            element : !user && <Register/>,
          },
          {
            path : '/admin-panel',
            element : isAdmin ? <Admin/> : <Login/>,
          },
          {
            path : '/admin-panel/user-edit/:id',
            element : isAdmin ? <UserEdit/> : <Login/>,
          },
          {
            path : '/admin-panel/message',
            element : isAdmin ? <Message/> : <Login/>,
          },
          {
            path : '/admin-panel/message-detail/:id',
            element : isAdmin ? <MessageDetail/> : <Login/>,
          },
          {
            path : '/admin-panel/profile',
            element : isAdmin ? <Profile/> : <Login/>,
          },
          {
            path : '/admin-panel/edit-name-image/:id',
            element : isAdmin ? <EditNi/> : <Login/>,
          },
          {
            path : '/admin-panel/edit-create',
            element : isAdmin ? <PositionCreate/> : <Login/>,
          },
          {
            path : '/admin-panel/edit-position/:id',
            element : isAdmin ? <PositionEdit/> : <Login/>,
          },
          {
            path : '/admin-panel/skill-add',
            element : isAdmin ? <SkillAdd/> : <Login/>,
          },
          {
            path : '/admin-panel/skill-edit/:id',
            element : isAdmin ? <SkillEdit/> : <Login/>,
          },
          
        ]
      }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
