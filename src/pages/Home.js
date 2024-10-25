import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { localeData, countries } from '../services/localeData';
import AirportSelector from './AirportSelector';
import { searchFlights, searchHotels, searchCars } from '../utils/api'; 
import SearchResults from './SearchResults'; 

const Home = () => {
  const navigate = useNavigate();
  const [isInternational, setIsInternational] = useState(false);
  const [countryFrom, setCountryFrom] = useState('');
  const [countryTo, setCountryTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cabinClass, setCabinClass] = useState('economy');
  const [locale, setLocale] = useState(localeData[0].id);
  
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]); 
  const [error, setError] = useState('');

  const cabinClasses = [
    { value: 'economy', label: 'Economy' },
    { value: 'premiumEconomy', label: 'Premium Economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First' },
  ];

  const handleSearch = async () => {
    // Validate inputs
    if (!countryFrom) {
      alert('Please select a country of origin.');
      return;
    }
    if (isInternational && !countryTo) {
      alert('Please select a destination country.');
      return;
    }
    if (!departureDate) {
      alert('Please select a departure date.');
      return;
    }
    if (!departureAirport) {
      alert('Please select a departure airport.');
      return;
    }
    if (isInternational && !arrivalAirport) {
      alert('Please select an arrival airport.');
      return;
    }

    try {
      // Fetch flights
      const flightResults = await searchFlights(
        departureAirport.skyId,
        arrivalAirport.skyId,
        departureAirport.entityId,
        arrivalAirport.entityId,
        departureDate,
        cabinClass,
        1 // Assuming 1 adult
      );
      setFlights(flightResults?.data?.itineraries || []);

      // Set check-in and check-out dates for hotel search
      const checkin = departureDate;
      const checkout = new Date(departureDate);
      checkout.setDate(checkout.getDate() + 1); // Checkout is the day after departure
      const checkoutString = checkout.toISOString().split('T')[0]; // Format to YYYY-MM-DD

      // Fetch hotels based on the destination city (arrival airport)
      const destinationQuery = arrivalAirport.entityId || '';
      const hotelResults = await searchHotels(1, 1, destinationQuery, checkin, checkoutString); // 1 adult, 1 room
      setHotels(hotelResults?.data?.hotels || []);

      // Fetch available cars
      const pickupDate = departureDate; // Use departureDate as the pickup date
      const pickupTime = '10:00'; // Fixed pickup time
      const carResults = await searchCars(
        arrivalAirport.entityId, // Pass the destination city entityId
        pickupDate, // Pickup date
        pickupTime, // Fixed pickup time
      );
      setCars(carResults?.data?.quotes || []); // Assuming quotes contain the car data

      setError(''); // Clear any previous error messages
    } catch (error) {
      setError("Error fetching flights, hotels, or cars. Please try again later.");
    }
  };

  return (
    <Box sx={{ bgcolor: '#e3f2fd', py: 5 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <FormControl variant="outlined" size="small">
              <InputLabel id="locale-label">Source Selection</InputLabel>
              <Select
                labelId="locale-label"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                label="Source Selection"
                sx={{ backgroundColor: 'white' }}
              >
                {localeData.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h4" align="center" gutterBottom>
            Find Your Perfect Trip
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Search for flights, hotels, and rental cars, all in one place!
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isInternational}
                    onChange={(e) => setIsInternational(e.target.checked)}
                    color="success"
                  />
                }
                label={isInternational ? "International Travel" : "Domestic Travel"}
              />
            </Grid>

            <Grid item xs={12}>
              <AirportSelector
                localed={locale}
                countries={countries}
                isInternational={isInternational}
                setCountryFrom={setCountryFrom}
                setCountryTo={setCountryTo}
                setSelectedDepartureAirport={(airport) => setDepartureAirport(airport)}
                setSelectedArrivalAirport={(airport) => setArrivalAirport(airport)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Departure Date"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Cabin Class</InputLabel>
                <Select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                >
                  {cabinClasses.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>

          {/* Display Search Results */}
          <SearchResults flights={flights} hotels={hotels} cars={cars} /> 

          {error && <Typography color="error" align="center">{error}</Typography>}
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
