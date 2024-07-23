import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Grid, Typography, Link, List, ListItem } from "@mui/material";

export const GlobalFooter = () => {
  return (
    // <Box
    //   sx={{
    //     marginTop: "calc(10% + 60px)",
    //     position: "fixed",
    //     bottom: 0,
    //     width: "100%",
    //     bgcolor: "#ebeff5",
    //   }}
    //   component="footer"
    // >
    <Box
      // sx={{ width: "100%", bgcolor: "#bfd6f3",  bottom: 0, position: 'fixed',  marginTop: 'auto' }}
      // component="footer"
      component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    }}
      
    >
      <Grid item xs={10}   justifyContent="center"
        alignItems="center" container 
        >
        <Typography variant="h6">
          MERN project 2024
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <List sx={{display:'flex'}}>
          <ListItem>
            
            <Link href="#">
            <EmailIcon />
          </Link>
          </ListItem>
          <ListItem>
          <Link href="#">
            <LinkedInIcon />
          </Link>
          </ListItem>
          <ListItem>
          <Link href="#">
            {" "}
            <GitHubIcon />
          </Link>
          </ListItem>
        </List>
      </Grid>
    </Box>
    // </Box>
  );
};
