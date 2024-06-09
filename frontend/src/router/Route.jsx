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
            path : '/login',
            element : !user && <Login/>,
          },
          {
            path : '/register',
            element : !user && <Register/>,
          },
        ]
      }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
