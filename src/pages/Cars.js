import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Pagination,
  Box,
} from '@mui/material';

const Cars = ({ cars }) => {
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = cars.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {currentCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.guid}>
            <Card sx={{ mb: 2, '&:hover': { boxShadow: 8 } }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">{car.car_name}</Typography>
                <Typography variant="body1" fontWeight="bold">Price: ${car.price.toFixed(2)}</Typography>
                <Typography variant="body2">Fuel Policy: {car.fuel_pol}</Typography>
                <Typography variant="body2">Vendor: {car.vndr}</Typography>
                <Typography variant="body2">Seats: {car.seat}</Typography>
                <Typography variant="body2">Transmission: {car.trans}</Typography>
                <Typography variant="body2">Doors: {car.doors}</Typography>
                <Typography variant="body2">Max Bags: {car.max_bags}</Typography>
                <Typography variant="body2">Pickup Type: {car.pickup_type}</Typography>

                <Typography variant="body2">
                  Rating: {car.vndr_rating ? car.vndr_rating.overall_rating.toFixed(2) : 'N/A'}
                </Typography>
                {car.vndr_rating && (
                  <Typography variant="body2">
                    Condition: {car.vndr_rating.car_condition.toFixed(2)}, 
                    Cleanliness: {car.vndr_rating.cars_kept_clean.toFixed(2)},
                    Easy Pickup: {car.vndr_rating.easy_pickup.toFixed(2)},
                    Service: {car.vndr_rating.service.toFixed(2)}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  href={car.dplnk}
                  target="_blank"
                  sx={{ mt: 2 }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Cars;
