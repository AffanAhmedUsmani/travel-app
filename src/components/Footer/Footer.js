import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 2, mt: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Affan Ahmed Full stack developer .
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="#" color="inherit" underline="none">github</Link> | <Link href="https://github.com/AffanAhmedUsmani" color="inherit" underline="none">Link</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
