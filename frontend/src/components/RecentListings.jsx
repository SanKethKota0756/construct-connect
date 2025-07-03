// frontend/src/components/RecentListings.jsx - FULLY UPDATED

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api';
import ListingCard from './ListingCard';

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/api/listings');
        // We only show the first 6 items on the homepage
        setListings(data.listings.slice(0, 6)); 
        setLoading(false);
      } catch (err) {
        setError('Could not fetch recent listings.');
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (listings.length === 0) return null;

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
        
        {/* The "View All Listings" button now links to our new browse page */}
        <div className="text-center mt-5">
          <Link to="/browse">
            <Button variant="outline-orange" className="btn-outline-orange px-5 py-2">
              View All Listings
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default RecentListings;