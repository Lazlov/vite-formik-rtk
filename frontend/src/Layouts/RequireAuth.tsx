import { useLocation, Navigate, Outlet  } from "react-router-dom"

import { Welcome } from "../Pages/Welcome"
import { selectCurrentToken } from "../Services/Auth/authSlice"
import { useAppSelector } from "../Services/hooks"
import { Auth} from "./Auth"

export const RequireAuth = () => {
    const token = useAppSelector(selectCurrentToken)
    const location = useLocation()
    console.log("requireauth", token)
  return (
       token? <Outlet/>:  <></>
    //  token? <Outlet/>  :  <Navigate to="/login" state={{ from: location }}  />
  )
}
