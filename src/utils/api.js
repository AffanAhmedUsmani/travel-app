import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const API_HOST = 'sky-scrapper.p.rapidapi.com';

const axiosInstance = axios.create({
  baseURL: `https://${API_HOST}/api/`,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
});

// Function to search airports
export const searchAirports = async (query,localed) => {
  try {
    console.log(query,localed);
    const response = await axiosInstance.get('/v1/flights/searchAirport', {
      params: {
        query,
        locale: localed,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching airports:", error);
    throw error;
  }
};

// Function to search flights
export const searchFlights = async (originSkyId, destinationSkyId, originEntityId, destinationEntityId, date ,cabinClass) => {
  try {
    const response = await axiosInstance.get('/v2/flights/searchFlights', {
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        cabinClass,
        adults:'1',
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw error;
  }
};

// Function to search hotels
export const searchHotels = async (adults, rooms,entityId, checkin, checkout) => {
  try {
    const response = await axiosInstance.get('/v1/hotels/searchHotels', {
      params: {
        entityId,
    checkin,
    checkout,
        adults,
        rooms,
        limit: '30',
        sorting: '-relevance',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching hotels:", error);
    throw error;
  }
};

// Function to search for hotel by name or destination
export const searchDestinationOrHotel = async (query) => {
  try {

    const response = await axiosInstance.get('/v1/hotels/searchDestinationOrHotel', {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching destination or hotel:", error);
    throw error;
  }
};

// Function to get hotel details
export const getHotelDetails = async (hotelId, entityId) => {
  try {
    const response = await axiosInstance.get('/v1/hotels/getHotelDetails', {
      params: {
        hotelId,
        entityId,
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting hotel details:", error);
    throw error;
  }
};

// Function to search cars
export const searchCars = async (pickUpEntityId, pickUpDate, pickUpTime) => {
  try {
    const response = await axiosInstance.get('/v1/cars/searchCars', {
      params: {
        pickUpEntityId,
        pickUpDate,
        pickUpTime,
        currency: 'USD',
        countryCode: 'US',
        market: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching cars:", error);
    throw error;
  }
};

// Function to search car locations
export const searchCarLocations = async (query) => {
  try {
    const response = await axiosInstance.get('/v1/cars/searchLocation', {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching car locations:", error);
    throw error;
  }
};
