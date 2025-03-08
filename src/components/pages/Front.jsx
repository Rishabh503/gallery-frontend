import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar'

export const Front = () => {
  return (
    <div className='w-full '>
        <Navbar/>
        <Outlet/>
    </div>
  )
}
