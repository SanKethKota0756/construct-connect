// frontend/src/components/EmptyState.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // A good default icon

const EmptyState = ({
  icon: Icon = Search, // Allow passing a custom icon, default to Search
  title = "No Listings Found",
  message = "Your search returned no results. Try adjusting your filters.",
  showButton = true,
  buttonText = "Clear Search & Go Home",
  buttonLink = "/"
}) => {
  return (
    <div className="text-center p-5 bg-light rounded-3 my-5">
      <div className="mb-3">
        <Icon size={48} className="text-muted" />
      </div>
      <h2 className="fw-bold">{title}</h2>
      <p className="text-muted">{message}</p>
      {showButton && (
        <Link to={buttonLink}>
          <Button variant="orange" className="btn-orange mt-3">
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;