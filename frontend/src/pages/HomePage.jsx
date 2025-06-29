// frontend/src/pages/HomePage.jsx - FULLY UPDATED

import React from 'react';
import Hero from '../components/Hero';
import RecentListings from '../components/RecentListings';
import SampleListings from '../components/SampleListings'; // 1. Import the new component
import ValueProps from '../components/ValueProps';

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* 2. Add the new SampleListings section here */}
      <SampleListings /> 
      <RecentListings />
      <ValueProps />
    </>
  );
};

export default HomePage;