// frontend/src/pages/BrowsePage.jsx - NEW FILE

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import API from '../api';
import ListingCard from '../components/ListingCard';

const BrowsePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setLoading(true);
        // This API call fetches ALL active listings by default
        const { data } = await API.get('/api/listings');
        setListings(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch listings.');
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-4">All Active Listings</h1>
      <p className="text-muted mb-4">Browse all available materials from the community.</p>
      <hr />

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 mt-3">
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
      )}
      {/* We can add pagination controls here in the future */}
    </Container>
  );
};

export default BrowsePage;