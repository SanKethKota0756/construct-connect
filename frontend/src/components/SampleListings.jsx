// frontend/src/components/SampleListings.jsx - UPDATED WITH TELANGANA LOCATIONS

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListingCard from './ListingCard';

// Import local images
import sampleBricks from '../assets/images/bricks.jpg';
import sampleTiles from '../assets/images/tiles.jpg';
import sampleLumber from '../assets/images/lumber.jpg';
import samplePaint from '../assets/images/paints.jpg';

// The mock data array now uses locations in Telangana
const sampleData = [
  { 
    _id: 'sample1', 
    images: [sampleLumber], 
    category: 'Lumber', 
    title: 'High-Quality Pine 2x4s', 
    price: 3750, 
    isFree: false, 
    location: 'Warangal, TS' // <-- UPDATED
  },
  { 
    _id: 'sample2', 
    images: [sampleTiles], 
    category: 'Tiles', 
    title: 'Modern White Subway Tiles', 
    price: 0, 
    isFree: true, 
    location: 'Karimnagar, TS' // <-- UPDATED
  },
  { 
    _id: 'sample3', 
    images: [sampleBricks], 
    category: 'Masonry', 
    title: 'Classic Red Clay Bricks (Full Pallet)', 
    price: 2500, 
    isFree: false, 
    location: 'Nizamabad, TS' // <-- UPDATED
  },
  { 
    _id: 'sample4', 
    images: [samplePaint], 
    category: 'Paint', 
    title: 'Unused Cans of Premium Paint', 
    price: 1500, 
    isFree: false, 
    location: 'Khammam, TS' // <-- UPDATED
  },
];


const SampleListings = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <h2 className="text-center fw-bold mb-3">Sample Listings</h2>
        <p className="text-center text-muted mb-5">See what a great listing looks like</p>
        <Row xs={1} md={2} lg={4} className="g-4">
          {sampleData.map((listing) => (
            <Col key={listing._id}>
              <ListingCard
                id={listing._id}
                image={listing.images[0]}
                category={listing.category}
                title={listing.title}
                price={listing.price}
                isFree={listing.isFree}
                location={listing.location}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SampleListings;