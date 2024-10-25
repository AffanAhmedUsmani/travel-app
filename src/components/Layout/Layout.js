import React from 'react';
import { Container, Box, Typography, CssBaseline } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}
    >
      <CssBaseline />
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          padding: 3 
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
