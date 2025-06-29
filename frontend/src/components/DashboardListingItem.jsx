// frontend/src/components/DashboardListingItem.jsx - COMPLETE AND FINAL VERSION

import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons'; // Import the trash icon

const DashboardListingItem = ({ listing, onMarkAsSold, onDelete }) => {
  return (
    <div className="border rounded p-3 mb-3 bg-white shadow-sm">
      <Row className="align-items-center">
        <Col md={2} sm={3} xs={4}>
          <Image src={listing.images[0]} alt={listing.title} fluid rounded />
        </Col>
        <Col md={4} sm={9} xs={8}>
          <h5 className="mb-1">{listing.title}</h5>
          <p className="text-muted mb-1 small">
            Category: {listing.category} | Condition: {listing.condition}
          </p>
          <p className="fw-bold mb-0">
            {listing.isFree ? 'FREE' : `₹${listing.price.toLocaleString()}`}
          </p>
        </Col>
        <Col md={2} className="text-center d-none d-md-block">
          <span className={`badge ${listing.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
            {listing.status}
          </span>
        </Col>
        <Col md={4} className="text-end">
          <Link to={`/listing/${listing._id}/edit`} className="btn-link-wrapper">
            <Button variant="secondary" size="sm" className="me-2">
              Edit
            </Button>
          </Link>
          
          {listing.status === 'Active' && (
            <Button variant="info" size="sm" className="me-2" onClick={() => onMarkAsSold(listing._id)}>
              Mark as Sold
            </Button>
          )}

          <Button variant="outline-danger" size="sm" onClick={() => onDelete(listing._id)}>
            <Trash /> {/* Use a trash icon for a cleaner look */}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardListingItem;