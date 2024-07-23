import React from 'react'
import { Link, Outlet } from 'react-router-dom'
 import { selectCurrentUser } from '../Services/Auth/authSlice'
import { useAppSelector } from '../Services/hooks'
import { Box } from '@mui/material'


export const Welcome = () => {
    const user = useAppSelector(selectCurrentUser)
  return (
    <Box
    component="main" sx={{ p: 3 }}
  >
      <h1>Welcome {`${user?.email}`}</h1>
        
         {/* <Outlet/> */}
      </Box>
  )
}
