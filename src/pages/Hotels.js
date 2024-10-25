import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Paper } from '@mui/material';

const Hotels = ({ hotels }) => {
  return (
    <Grid container spacing={2}>
      {hotels.map(hotel => (
        <Grid item xs={12} sm={6} md={4} key={hotel.hotelId}>
          <Card variant="outlined" sx={{ marginBottom: 2, '&:hover': { boxShadow: 8 } }}>
            <CardMedia
              component="img"
              height="140"
              image={hotel.heroImage}
              alt={hotel.name}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{hotel.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {hotel.stars} Stars | {hotel.distance}
              </Typography>
              <Typography variant="body1" fontWeight="bold">{hotel.price}</Typography>
              {hotel.rating && (
                <Typography variant="body2" color="text.secondary">
                  Rating: {hotel.rating.value} ({hotel.rating.count} reviews)
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Hotels;
