import React from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import Flights from './Flights'; 
import Hotels from './Hotels'; 
import Cars from './Cars'; 

const SearchResults = ({ flights, hotels, cars }) => { 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={2}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Flights" />
          <Tab label="Hotels" />
          <Tab label="Cars" />
        </Tabs>
      </Paper>
      <Box p={3}>
        {value === 0 && (
          <>
            {flights.length > 0 ? (
              <Flights flights={flights} />
            ) : (
              <Typography variant="h6">No flights found.</Typography>
            )}
          </>
        )}
        {value === 1 && (
          <>
            {hotels.length > 0 ? (
              <Hotels hotels={hotels} />
            ) : (
              <Typography variant="h6">No hotels found.</Typography>
            )}
          </>
        )}
        {value === 2 && (
          <>
            {cars.length > 0 ? (
              <Cars cars={cars} />
            ) : (
              <Typography variant="h6">No cars found.</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
