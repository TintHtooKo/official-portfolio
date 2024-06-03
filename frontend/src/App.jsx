import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'

export default function App() {
  return (
    <>
    <NavBar/>
      <div>
        <Outlet/>
      </div>
    </>
  )
}
