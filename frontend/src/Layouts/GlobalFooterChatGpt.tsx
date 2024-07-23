import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box
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
     
     
      {/* <Container maxWidth="lg"> */}
      <Container maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">About Us</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Careers</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Contact Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Facebook</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Twitter</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Instagram</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Privacy Policy</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Terms of Service</Link>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            <Link color="inherit" href="https://yourwebsite.com/">
              Your Company
            </Link>{' '}
            {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

