import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate, Navigate, useLocation} from 'react-router-dom'
import { useAuth } from '../Components/useAuth'
import { useLogOutMutation } from '../Services/Auth/authApiSlice'
Navigate


export const GlobalNav = () => {
  const location = useLocation();
  const {isUser} = useAuth()
  const navigate = useNavigate();
const[logOut]=useLogOutMutation()
const logOutHandler = async ()=>{
  try{
    await logOut(null)
    navigate("/");
  
  }
  catch(err){
    console.log(err)
  }
  {console.log(isUser)}
}
  return (
    <div>
        {/* <Navigate to="/login" state={{ from: location }} replace />// */}
        {!isUser &&<Link to="/">Home not auth</Link>}
        {isUser && <Link to="/d/welcome">Home auth</Link>}
        {isUser && <Link to="/d/users">users</Link>}
       {!isUser && <Link to="/login">login</Link> } 
       {!isUser && <Link to="/registration">registration</Link>}
        <div>email</div>
       {isUser && <Button onClick={()=>logOutHandler()}>Logout</Button>}


    </div>
  )
}
