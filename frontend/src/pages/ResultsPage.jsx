// frontend/src/pages/ResultsPage.jsx - RENAMED AND UPDATED

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import API from '../api';
import ListingCard from '../components/ListingCard';
import EmptyState from '../components/EmptyState';

// 1. Component name changed
const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const keyword = searchParams.get('keyword') || '';
  const location = searchParams.get('location') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ keyword, location, minPrice, maxPrice }).toString();
        const { data } = await API.get(`/api/listings?${params}`);
        setListings(data.listings); // Assuming API returns { listings, page, pages }
        setLoading(false);
      } catch (err) {
        setError('Could not fetch search results.');
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [keyword, location, minPrice, maxPrice]);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Search Results</h1>
      <p className="text-muted mb-4">
        {keyword && <span>Showing results for <strong>{`'${keyword}' `}</strong></span>}
        {location && <span>in <strong>{location}</strong></span>}
      </p>
      <hr />

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : listings.length === 0 ? (
        <EmptyState 
          title="No Listings Found"
          message="Your search returned no results. Try adjusting your filters or go back to the homepage."
          buttonText="Go Back to Homepage"
          buttonLink="/"
        />
      ) : (
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
      )}
    </Container>
  );
};

// 2. Export name changed
export default ResultsPage;