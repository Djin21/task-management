import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='p-16'>
      <Outlet />
    </div>
  )
}

export default Layout
