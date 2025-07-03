// frontend/src/components/Hero.jsx - FULLY UPDATED

import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    
    // The only change is here: it now navigates to '/results'
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="hero-section text-center py-5">
      <Container>
        <h1 className="display-4 fw-bold hero-title">Find Materials. <br /><span className="highlight">Build Dreams.</span></h1>
        <p className="lead text-muted mt-3 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
          Connect with your local construction community. Buy, sell, and trade surplus building materials in your area.
        </p>
        <div className="bg-white p-4 rounded-3 shadow-lg mx-auto" style={{ maxWidth: '900px' }}>
          <Form onSubmit={submitHandler}>
            <Row className="g-3 text-start align-items-end">
              <Col md={5} xs={12} className="mb-2 mb-md-0">
                <Form.Label className="fw-semibold">What materials do you need?</Form.Label>
                <Form.Control type="text" placeholder="e.g., 'subway tile', 'lumber'" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </Col>
              <Col md={3} xs={12} className="mb-2 mb-md-0">
                <Form.Label className="fw-semibold">Location</Form.Label>
                <Form.Control type="text" placeholder="e.g., Hyderabad" value={location} onChange={(e) => setLocation(e.target.value)} />
              </Col>
              <Col md={4} xs={12}>
                <Form.Label className="fw-semibold">Price Range (₹)</Form.Label>
                <InputGroup>
                  <Form.Control type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  <InputGroup.Text>-</InputGroup.Text>
                  <Form.Control type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </InputGroup>
              </Col>
            </Row>
            <Button type="submit" variant="orange" className="btn-orange w-100 mt-4 py-2 fw-bold">
              Search Materials
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Hero;