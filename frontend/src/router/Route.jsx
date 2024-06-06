import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
import Knowledge from '../page/Knowledge'
import Detail from '../page/Detail'
import Login from '../page/Login'
import Register from '../page/Register'
import { AuthContext } from '../context/AuthContext'

export default function Route() {
    let {user} = useContext(AuthContext)
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
