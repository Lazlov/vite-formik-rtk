import { Button, CssBaseline } from "@mui/material";
import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../Components/useAuth";
import { useLogOutMutation } from "../Services/Auth/authApiSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { StaticRouter } from "react-router-dom/server";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { selectCurrentUser } from "../Services/Auth/authSlice";
import { useSelector } from "react-redux";


export const GlobalNav = () => {
  const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
    (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />
  );

  function Router(props: { children?: React.ReactNode }) {
    const { children } = props;
    if (typeof window === "undefined") {
      return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return <MemoryRouter>{children}</MemoryRouter>;
  }

  const user = useSelector(selectCurrentUser);

  const location = useLocation();
  const { isUser } = useAuth();
  const navigate = useNavigate();
  const [logOut] = useLogOutMutation();
  const logOutHandler = async () => {
    try {
      await logOut(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    {
      console.log(isUser);
    }
  };
  return (
   
     
      <AppBar component="nav" 
       >
      
        <Toolbar sx={{ justifyContent: 'space-between' }} >
          {/*  static <Navigate to="/login" state={{ from: location }} replace />// */     }
         <div> {isUser && (
            <IconButton color="inherit" component={RouterLink} to="/d/welcome">
              <HomeIcon />
            </IconButton>
          )}
          {!isUser && (
            <IconButton color="inherit" component={RouterLink} to="/">
              <HomeIcon />
            </IconButton>
          )}
          {isUser && (
            <Button color="inherit" component={RouterLink} to="/d/users">
              users
            </Button>
          )}
</div>
         

<Box display="flex"  sx={{ alignItems: 'center' }} >  {!isUser && (
            <Button  color="inherit" component={RouterLink} to="/login">
              login
            </Button>
          )}
          {!isUser && (
            <Button color="inherit" component={RouterLink} to="/registration">
              registration
            </Button>
          )}
          {isUser &&   <Typography variant="h6" component="div" sx={{ flexGrow: 1 } }>
          {user?.email}
              </Typography>}

        

          {isUser && (
            <IconButton  sx={{ mr: 2 }} color="inherit" onClick={() => logOutHandler()}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Exit{" "}
              </Typography>
              <ExitToAppIcon   sx={{ ml: 1 }} />{" "}
            </IconButton>
          )}</Box>
        
        </Toolbar>
      </AppBar>
     
  );
};
