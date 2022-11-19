// import { AdminLayout } from "./AuthHeaderLayout";
// import { UserLayout } from "./AuthLayout";
import { useAppDispatch } from "../Services/hooks";
import { add } from "../Services/Slices/cartSlice";
import { useAuth } from "../Components/useAuth";
import { Link } from "react-router-dom";

export const HomeLayout = () => {
  const dispatch = useAppDispatch();
  const {_id, roles, isUser, isAdmin} = useAuth()
  return (
    <div>
      
    <Products>
      {/* <button onClick={()=>dispatch(add({value:"hh"}))}>add</button> */}
    {/* {isAdmin &&  <AdminLayout />}
    {isUser && <UserLayout />}
     {!isAdmin && !isUser && <GuestLayout/>}
      {_id}
      {roles} */}
    </div>
  );
};
