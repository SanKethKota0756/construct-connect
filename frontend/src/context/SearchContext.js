// frontend/src/context/SearchContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This is the main function that performs the search.
  // It accepts all the new parameters we need.
  const fetchListings = async (keyword = '', location = '', minPrice = '', maxPrice = '') => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Build the URL with only the parameters that have values
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('location', location);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      
      const { data } = await axios.get(`/api/listings?${params.toString()}`);
      
      setListings(data);
      setLoading(false);
    } catch (err) {
      setError('Could not fetch listings. Please try again later.');
      setLoading(false);
    }
  };

  // This useEffect hook runs only once when the app starts,
  // to fetch the initial, unfiltered list of all recent items.
  useEffect(() => {
    fetchListings();
  }, []);

  // Provide the state and the search function to all child components
  return (
    <SearchContext.Provider value={{ listings, loading, error, fetchListings }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };