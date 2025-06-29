// frontend/src/components/ListingCard.jsx - SMARTER VERSION

import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { GeoAltFill, Tag } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const ListingCard = ({ id, image, category, title, price, isFree, location }) => {
  // Check if this is a sample listing by looking at its ID
  const isSample = id.startsWith('sample');

  // Define the content that will be rendered inside the card body
  const CardContent = () => (
    <>
      <Card.Title className="text-dark text-decoration-none">{title}</Card.Title>
      <Card.Text as="div" className="mt-2">
        <div className={`fs-4 fw-bolder ${isFree ? 'text-success' : 'text-dark'}`}>
          {isFree ? 'FREE' : `₹${price.toLocaleString()}`}
        </div>
        <div className="text-muted d-flex align-items-center mt-1">
          <GeoAltFill className="me-1" /> {location}
        </div>
      </Card.Text>
    </>
  );

  return (
    // If it's a sample, add a 'sample-card' class for styling
    <Card className={`h-100 border-0 shadow-sm listing-card ${isSample ? 'sample-card' : ''}`}>
      {isSample ? (
        // For sample cards, render a non-clickable image
        <Card.Img variant="top" src={image} />
      ) : (
        // For real cards, render a clickable link
        <Link to={`/listing/${id}`}>
          <Card.Img variant="top" src={image} />
        </Link>
      )}

      {/* The badges can remain the same, but we adjust their position logic slightly */}
      <div className="position-relative">
        <Badge pill bg="dark" className="position-absolute start-0 m-2 d-flex align-items-center" style={{ top: '-13rem' }}>
          <Tag className="me-1" /> {category}
        </Badge>
        {isFree && (
          <Badge pill className="badge-free position-absolute end-0 m-2" style={{ top: '-13rem' }}>
            FREE
          </Badge>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        {isSample ? (
            // For sample cards, the title and content are not links
            <div className="flex-grow-1"><CardContent /></div>
        ) : (
            // For real cards, the title is a link
            <Link to={`/listing/${id}`} className="text-decoration-none flex-grow-1"><CardContent /></Link>
        )}

        {!isSample && (
            // Only show the "View Details" button for real cards
            <Link to={`/listing/${id}`} className="btn-link-wrapper mt-auto">
                <Button variant="outline-orange" className="btn-outline-orange w-100 fw-semibold">
                    View Details
                </Button>
            </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListingCard;