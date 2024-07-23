// import { AdminLayout } from "../Layouts/AuthHeaderLayout";
import { Public } from "../Layouts/Public";
// import { UserLayout } from "../Layouts/AuthLayout";
import { useAppDispatch } from "../Services/hooks";
import { add } from "../Services/Slices/cartSlice";
import { useAuth } from "../Components/useAuth";
import { Link, Outlet } from "react-router-dom";
import { GlobalNav } from "../Layouts/GlobalNav";

// import { GlobalFooter } from "../Layouts/GlobalFooter";
import { Footer } from "../Layouts/GlobalFooterChatGpt";

import { GlobalMain } from "../Layouts/GlobalMain";
import { Box, Container, CssBaseline } from "@mui/material";
import { GlobalFooter } from "../Layouts/GlobalFooter";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const { _id, roles, isUser, isAdmin } = useAuth();
  return (
    <Box
      sx={{display: "flex"}}
    >
      <CssBaseline />
      <GlobalNav />
     <Box component="main" sx={{ p: 3 }} width="100%">
     <Outlet />
     </Box>
      
    </Box>
  );
};
