// frontend/src/components/Footer.jsx - FULLY CORRECTED

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import { WrenchAdjustable, Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <footer className="footer-dark text-light py-5">
      <Container>
        <Row className="py-4">
          <Col md={6} lg={4} className="mb-4">
            <h5 className="fw-bold d-flex align-items-center mb-3" style={{ color: 'var(--brand-orange)' }}>
              <WrenchAdjustable className="me-2" /> ConstructConnect
            </h5>
            <p className="text-white-50 pe-lg-5">
              Connecting construction professionals and DIYers to reduce waste and build better communities.
            </p>
          </Col>
          <Col xs={6} md={3} lg={2} className="mb-4 footer-links">
            <h6 className="fw-bold text-uppercase">For Buyers</h6>
            {/* Use the Link component for internal navigation */}
            <Link to="/search">Search Materials</Link>
            <Link to="/how-to-buy">How to Buy</Link>
            <Link to="/safety-tips">Safety Tips</Link>
          </Col>
          <Col xs={6} md={3} lg={2} className="mb-4 footer-links">
            <h6 className="fw-bold text-uppercase">For Sellers</h6>
            <Link to="/create-listing">Create Listing</Link>
            <Link to="/seller-guide">Seller Guide</Link>
            <Link to="/pricing-tips">Pricing Tips</Link>
          </Col>
          <Col xs={6} md={3} lg={2} className="mb-4 footer-links">
            <h6 className="fw-bold text-uppercase">Company</h6>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </Col>
        </Row>
        
        <hr className="border-secondary" />

        <Row className="d-flex justify-content-between align-items-center text-white-50 small pt-3">
          <Col md={6} className="mb-3 mb-md-0 text-center text-md-start">
            <p className="mb-0">© {new Date().getFullYear()} ConstructConnect. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            {/* For external links, using <a> is fine, but provide a placeholder URL */}
            <a href="https://facebook.com" className="social-icon text-white-50 me-3 fs-5"><Facebook /></a>
            <a href="https://twitter.com" className="social-icon text-white-50 me-3 fs-5"><Twitter /></a>
            <a href="https://instagram.com" className="social-icon text-white-50 fs-5"><Instagram /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;