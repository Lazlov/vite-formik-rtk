import { Link, Outlet } from "react-router-dom";
import { ItemList } from "./ItemList";
import { Box } from "@mui/material";
import { GlobalFooter } from "./GlobalFooter";
import { Height } from "@mui/icons-material";


export const Public = () => {
  return (   
    <Box component="main" >
    
    <ItemList/>
    <GlobalFooter/>
    </Box>
  );
   
       
};
