import { Route, Routes } from "react-router-dom";
import { Public } from "./Layouts/Public";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Registration } from "./Pages/Registration";
import { RequireAuth } from "./Layouts/RequireAuth";
import { Welcome } from "./Pages/Welcome";
import { ItemList } from "./Layouts/ItemList";
import { UserList } from "./Layouts/UserList";
import { Auth } from "./Layouts/Auth";
import { PersistLogin } from "./Services/Auth/PersistLogin";


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          //persist login
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route element={<Auth />}>
                <Route path="welcome" element={<Welcome />} />
                <Route path="users" element={<UserList />} />
              </Route>
            </Route>
          </Route>
          //persist login
        </Route>
      </Routes>
    </div>
  );
};
