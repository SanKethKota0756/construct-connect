// frontend/src/components/RecentListings.jsx - REVERTED TO SIMPLER VERSION

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import ListingCard from './ListingCard';

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // This component now only fetches the default list of all recent items
    const fetchListings = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/listings');
        // We only want to show a few on the homepage, e.g., the first 6
        setListings(data.slice(0, 6));
        setLoading(false);
      } catch (err) {
        setError('Could not fetch recent listings.');
        setLoading(false);
      }
    };

    fetchListings();
  }, []); // Runs only once

  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" /></div>;
  }
  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }
  if (listings.length === 0) {
    return null; // Don't show the section if there's nothing to show
  }

  return (
    <div>
      <div className="section-header text-center">
        <Container>
          <h2 className="mb-3">Just Added by the Community</h2>
          <p className="text-muted">Fresh materials posted by your local builders and DIYers</p>
        </Container>
      </div>
      <Container className="py-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {listings.map((listing) => (
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

export default RecentListings;