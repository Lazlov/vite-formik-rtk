// import { AdminLayout } from "../Layouts/AuthHeaderLayout";
import { Public } from "../Layouts/Public";
// import { UserLayout } from "../Layouts/AuthLayout";
import { useAppDispatch } from "../Services/hooks";
import { add } from "../Services/Slices/cartSlice";
import { useAuth } from "../Components/useAuth";
import { Link, Outlet } from "react-router-dom";
import { GlobalNav } from "../Layouts/GlobalNav";
import { GlobalFooter } from "../Layouts/GlobalFooter";

export const Home = () => {
  const dispatch = useAppDispatch();
  const {_id, roles, isUser, isAdmin} = useAuth()
  return (
    <div>
        <GlobalNav/>
        <Outlet/>
        <GlobalFooter/>
         {/* <Link to="/login">Login</Link> |{" "}
        <Link to="/registration">Registration</Link> */}
        
      {/* <button onClick={()=>dispatch(add({value:"hh"}))}>add</button> */}

    {/* {isAdmin &&  <AdminLayout />}
    {isUser && <UserLayout />}
     {!isAdmin && !isUser && <Public/>}
      {_id}
      {roles} */}
    </div>
  );
};
