import React from 'react'
import { Link, Outlet } from 'react-router-dom'
 import { selectCurrentUser } from '../Services/Auth/authSlice'
import { useAppSelector } from '../Services/hooks'

export const Welcome = () => {
    const user = useAppSelector(selectCurrentUser)
  return (
    <div>
      <h1>Welcome {`${user?.email}`}</h1>
        
         {/* <Outlet/> */}
      </div>
  )
}
