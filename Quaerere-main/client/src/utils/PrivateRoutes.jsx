import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import useAuthStore from '../context/store'

const PrivateRoutes = () => {
  
  const user = useAuthStore((state) => state.isAuthenticated);
  console.log(user)
  return (
    <>
      { user ? <Outlet/> : <Navigate to='/login'/> }
    </>
  )
}

export default PrivateRoutes