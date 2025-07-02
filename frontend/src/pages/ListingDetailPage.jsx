// frontend/src/pages/ListingDetailPage.jsx - COMPLETE AND UPDATED

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Image, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Envelope, Telephone, PersonCircle } from 'react-bootstrap-icons';
import API from '../api';

const ListingDetailPage = () => {
  const { id: listingId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/listings/${listingId}`);
        setListing(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const contactSellerHandler = () => {
    if (userInfo) {
      setShowContactInfo(true);
    } else {
      navigate(`/login?redirect=/listing/${listingId}`);
    }
  };

  return (
    <Container className="py-5">
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : listing ? (
        <>
          <Row>
            <Col md={7}>
              <Image src={listing.images[0]} alt={listing.title} fluid rounded className="mb-3" />
              {listing.images.length > 1 && (
                <Row>{listing.images.map((img, index) => (<Col xs={3} key={index}><Image src={img} alt={`${listing.title} - view ${index + 1}`} thumbnail fluid /></Col>))}</Row>
              )}
            </Col>
            <Col md={5}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title as="h2">{listing.title}</Card.Title>
                  <Card.Text><Badge bg={listing.status === 'Active' ? 'success' : 'secondary'}>{listing.status}</Badge></Card.Text>
                  <hr />
                  <Card.Text as="h3" className="my-3">{listing.isFree ? 'FREE' : `₹${listing.price.toLocaleString()}`}</Card.Text>
                  <hr />
                  <p><strong>Category:</strong> {listing.category}</p>
                  <p><strong>Condition:</strong> {listing.condition}</p>
                  <p><strong>Quantity:</strong> {listing.quantity} {listing.unit}</p>
                  <p><strong>Location:</strong> {listing.location}</p>
                  <hr />
                  <p><strong>Description:</strong> {listing.description}</p>
                </Card.Body>
              </Card>
              <div className="d-grid gap-2">
                <Button className="btn-orange" size="lg" onClick={contactSellerHandler} disabled={showContactInfo}>
                  {showContactInfo ? 'Contact Info Revealed' : 'Contact Seller'}
                </Button>
              </div>
            </Col>
          </Row>

          {/* This section now only shows Name and Email */}
          {showContactInfo && (
            <Row className="mt-4">
              <Col md={{ span: 7 }}>
                <Card className="bg-light border">
                  <Card.Header as="h5">Seller Information</Card.Header>
                  <Card.Body>
                    <p>
                      <PersonCircle className="me-2" /> 
                      <strong>Name:</strong> 
                      <Link to={`/profile/${listing.user._id}`} className="ms-2">{listing.user.name}</Link>
                    </p>
                    <p><Envelope className="me-2" /> _<strong>Email:</strong> <a href={`mailto:${listing.user.email}`}>{listing.user.email}</a></p>
                    {/* The phone number block has been completely removed */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      ) : null}
    </Container>
  );
};

export default ListingDetailPage;