import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
import Knowledge from '../page/Knowledge'
import Detail from '../page/Detail'
import Login from '../page/Login'
import Register from '../page/Register'

export default function Route() {
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
            element : <Knowledge/>,
          },
          {
            path : '/detail/:id',
            element : <Detail/>,
          },
          {
            path : '/login',
            element : <Login/>,
          },
          {
            path : '/register',
            element : <Register/>,
          },
        ]
      }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
