import React, { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { searchAirports } from '../utils/api';

const AirportSelector = ({ localed, countries, isInternational, setCountryFrom, setCountryTo, setSelectedDepartureAirport, setSelectedArrivalAirport }) => {
  const [countryFrom, setCountryFromState] = useState('');
  const [countryTo, setCountryToState] = useState('');
  const [departureAirports, setDepartureAirports] = useState([]);
  const [arrivalAirports, setArrivalAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirports = async (country) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchAirports(country, localed);
      if (response?.data) {
        // Filter only airport entities
        return response.data.filter(item => item.navigation.entityType === "AIRPORT");
      }
      return [];
    } catch (err) {
      setError("Error fetching airports. Please try again.");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleCountryFromChange = async (e) => {
    const selectedCountry = e.target.value;
    setCountryFromState(selectedCountry);
    setCountryFrom(selectedCountry); 
    setCountryToState(''); 
    setArrivalAirports([]); 

    // Fetch departure airports based on the selected country
    const airports = await fetchAirports(selectedCountry);
    setDepartureAirports(airports || []);

    // For domestic flights, set arrival airports to be the same as departure airports
    if (!isInternational) {
      setArrivalAirports(airports || []);
    }
  };

  const handleCountryToChange = async (e) => {
    const selectedCountry = e.target.value;
    setCountryToState(selectedCountry);
    setCountryTo(selectedCountry); 

    // Fetch arrival airports based on the selected country (only for international)
    const airports = await fetchAirports(selectedCountry);
    setArrivalAirports(airports || []);
  };

  const handleDepartureAirportChange = (e) => {
    const selectedAirport = departureAirports.find(airport => airport.entityId === e.target.value);
    if (selectedAirport) {
      setSelectedDepartureAirport({
        skyId: selectedAirport.skyId,
        entityId: selectedAirport.entityId,
        name: selectedAirport.presentation.suggestionTitle // Use name instead of entityId
      });
    }
  };

  const handleArrivalAirportChange = (e) => {
    const selectedAirport = arrivalAirports.find(airport => airport.entityId === e.target.value);
    if (selectedAirport) {
      setSelectedArrivalAirport({
        skyId: selectedAirport.skyId,
        entityId: selectedAirport.entityId,
        name: selectedAirport.presentation.suggestionTitle // Use name instead of entityId
      });
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Country From Dropdown */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="country-from-label">Country From</InputLabel>
          <Select
            labelId="country-from-label"
            value={countryFrom}
            onChange={handleCountryFromChange}
            label="Country From"
          >
            {countries.map(option => (
              <MenuItem key={option.id} value={option.text}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Country To Dropdown (Visible Only for International) */}
      {isInternational && (
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="country-to-label">Country To</InputLabel>
            <Select
              labelId="country-to-label"
              value={countryTo}
              onChange={handleCountryToChange}
              label="Country To"
            >
              {countries.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
        
      {/* Departure and Arrival Airport Dropdowns */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Departure Airport Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="departure-airport-label">Departure Airport</InputLabel>
              <Select
                labelId="departure-airport-label"
                onChange={handleDepartureAirportChange}
                label="Departure Airport"
                disabled={loading || !departureAirports.length}
              >
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : (
                  departureAirports.map((airport) => (
                    <MenuItem key={airport.entityId} value={airport.entityId}>
                      {airport.presentation.suggestionTitle}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Arrival Airport Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="arrival-airport-label">Arrival Airport</InputLabel>
              <Select
                labelId="arrival-airport-label"
                onChange={handleArrivalAirportChange}
                label="Arrival Airport"
                disabled={loading || !arrivalAirports.length}
              >
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : (
                  arrivalAirports.map((airport) => (
                    <MenuItem key={airport.entityId} value={airport.entityId}>
                      {airport.presentation.suggestionTitle}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {error && (
        <Grid item xs={12}>
          <p style={{ color: 'red' }}>{error}</p>
        </Grid>
      )}
    </Grid>
  );
};

export default AirportSelector;
