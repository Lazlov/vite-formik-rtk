import { Link, Outlet } from "react-router-dom";
import { ItemList } from "./ItemList";

export const Public = () => {
  return (
    <div>
      {" "}
      <nav>
        {/* <Link to="/registration">Registration</Link> | <Link to="/login">Login</Link> */}
        <ItemList/>
        <Outlet />
      </nav>
    </div>
  );
};
