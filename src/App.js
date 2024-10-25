import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Container, Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}
      >
        <Navbar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            padding: 3 
          }}
        >
          <Routes>
           
            <Route path="/travel-app/" element={<Home />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
