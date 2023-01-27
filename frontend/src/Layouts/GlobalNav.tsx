import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLogOutMutation } from '../Services/Auth/authApiSlice'

export const GlobalNav = () => {
const[logOut]=useLogOutMutation()
const logOutHandler = async ()=>{
  try{
    await logOut(null)
    
  }
  catch(err){
    console.log(err)
  }

}
  return (
    <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        <Link to="/login">login</Link>
        <Link to="/registration">registration</Link>
        <div>email</div>
        <Button onClick={()=>logOutHandler()}>Logout</Button>


    </div>
  )
}
