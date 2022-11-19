import { Outlet } from "react-router-dom"
import { AuthHeaderLayout } from "./AuthHeaderLayout"


export const Auth = () => {
  return (
    <div>
      {/* <div>to items</div>
      <div>to users</div> */}
      <Outlet />
    </div>
  )
}
