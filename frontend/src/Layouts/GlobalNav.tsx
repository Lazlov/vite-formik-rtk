import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { logOut } from '../Services/Auth/authSlice'

export const GlobalNav = () => {
  return (
    <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        <Link to="/login">login</Link>
        <Link to="/registration">registration</Link>
        <div>email</div>
        <Button onClick={()=>logOut()}>Logout</Button>


    </div>
  )
}
