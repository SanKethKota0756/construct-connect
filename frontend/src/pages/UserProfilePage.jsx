// frontend/src/pages/UserProfilePage.jsx - FULLY CORRECTED FOR DEPLOYMENT

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import API from '../api'; // 1. CHANGED: Import our new central API instance instead of axios
import ListingCard from '../components/ListingCard';
import { PersonCircle } from 'react-bootstrap-icons';
import EmptyState from '../components/EmptyState';

const UserProfilePage = () => {
  const { id: userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // 2. CHANGED: Use API.get() which knows the correct backend URL
        const { data } = await API.get(`/api/users/${userId}/listings`);
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not fetch user profile.');
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : userData ? (
        <>
          <Row className="mb-4 align-items-center bg-light p-4 rounded">
            <Col xs="auto">
              <PersonCircle size={60} className="text-secondary" />
            </Col>
            <Col>
              <h1 className="mb-0">{userData.user.name}'s Profile</h1>
              <p className="text-muted mb-0">
                Member since: {new Date(userData.user.createdAt).toLocaleDateString()}
              </p>
            </Col>
          </Row>
          
          <h2 className="mt-5 mb-4">Active Listings from this Seller</h2>
          <hr />

          {userData.listings.length === 0 ? (
            <EmptyState 
              title="No Active Listings"
              message={`${userData.user.name} does not have any active listings at the moment.`}
              showButton={false}
            />
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4 mt-3">
              {userData.listings.map((listing) => (
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
        </>
      ) : null}
    </Container>
  );
};

export default UserProfilePage;