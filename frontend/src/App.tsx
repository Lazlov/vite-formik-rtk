import { Navigate, Route, Routes } from "react-router-dom";
import { Public } from "./Layouts/Public";

import { Login } from "./Pages/Login";
import { Registration } from "./Pages/Registration";
import { RequireAuth } from "./Layouts/RequireAuth";
import { Welcome } from "./Pages/Welcome";
import { ItemList } from "./Layouts/ItemList";
import { UserList } from "./Layouts/UserList";
import { Auth } from "./Layouts/Auth";
import { PersistLogin } from "./Services/Auth/PersistLogin";
import { Prefetch } from "./Services/Auth/Prefetch";
import { Layout } from "./Pages/Layout";
import { useAppSelector } from "./Services/hooks";
import { selectCurrentToken } from "./Services/Auth/authSlice";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export const App = () => {
  const token = useSelector(selectCurrentToken);
  const username = localStorage.getItem("username")
  return (
    <div>
      <Routes>
          
        <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            username? (
              <Navigate  to="/d/welcome" replace />
            ) : (
              <Public />
            )
          }
        />
       
          {/* <Route path="/" element={<Public />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
         
          <Route element={<PersistLogin />}>
            <Route path="/d" element={<Auth />}>
              <Route element={<RequireAuth />}>
                <Route path="welcome" element={<Welcome />} />
                <Route path="users" element={<UserList />} />
            
            </Route>
          </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
