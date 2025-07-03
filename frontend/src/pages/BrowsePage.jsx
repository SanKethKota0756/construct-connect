// frontend/src/pages/BrowsePage.jsx - NEW FILE

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import API from '../api';
import ListingCard from '../components/ListingCard';
import Paginate from '../components/Paginate';
import EmptyState from '../components/EmptyState';

const BrowsePage = () => {
  const { pageNumber } = useParams() || { pageNumber: 1 };
  
  const [data, setData] = useState({ listings: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/listings?pageNumber=${pageNumber}`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch listings.');
        setLoading(false);
      }
    };
    fetchAllListings();
  }, [pageNumber]);

  return (
    <Container className="py-5">
      <h1 className="mb-4">All Active Listings</h1>
      <hr />

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : data.listings.length === 0 ? (
        <EmptyState title="No Listings Found" message="There are currently no active listings available." showButton={false} />
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4 mt-3">
            {data.listings.map((listing) => (
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
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </Container>
  );
};

export default BrowsePage;