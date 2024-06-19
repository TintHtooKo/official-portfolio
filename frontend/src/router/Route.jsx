import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
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
import ProjectAdd from '../admin/ProjectAdd'
import AddCategory from '../admin/AddCategory'
import AddWebsite from '../admin/AddWebsite'
import DataEdit from '../admin/DataEdit'

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
          {
            path : '/admin-panel/add-project',
            element : isAdmin ? <ProjectAdd/> : <Login/>,
          },
          {
            path : '/admin-panel/add-category',
            element : isAdmin ? <AddCategory/> : <Login/>,
          },
          {
            path : '/admin-panel/add-website',
            element : isAdmin ? <AddWebsite/> : <Login/>,
          },
          {
            path : '/admin-panel/edit-website/:id',
            element : isAdmin ? <AddWebsite/> : <Login/>,
          },
          {
            path : '/admin-panel/edit-data/:id',
            element : isAdmin ? <DataEdit/> : <Login/>,
          },
          
        ]
      }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
