import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Flights = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return <Typography variant="h6" align="center">No flights found.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {flights.map((flight) => (
        <Card key={flight.id} sx={{ mb: 2, '&:hover': { boxShadow: 8 } }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" fontWeight="bold">
                  {flight.legs[0].origin.name} → {flight.legs[0].destination.name}
                </Typography>
                <Typography variant="body1" fontWeight="bold">{flight.price.formatted}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  Departure: {new Date(flight.legs[0].departure).toLocaleString()} <br />
                  Arrival: {new Date(flight.legs[0].arrival).toLocaleString()} <br />
                  Duration: {Math.floor(flight.legs[0].durationInMinutes / 60)}h {flight.legs[0].durationInMinutes % 60}m
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                {flight.legs[0].carriers.marketing.map((carrier) => (
                  <Box key={carrier.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 40, height: 40, mr: 1 }}
                      image={carrier.logoUrl}
                      alt={carrier.name}
                    />
                    <Typography variant="body2">{carrier.name}</Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Flights;
