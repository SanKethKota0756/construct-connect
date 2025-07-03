// frontend/src/pages/info/CreateListingInfoPage.jsx - NEW FILE

import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreateListingInfoPage = () => {
  return (
    <Container className="py-5">
      <h1>How to Create a Listing</h1>
      <p className="lead">
        Listing your surplus materials on ConstructConnect is simple and helps reduce waste in our community.
      </p>
      <hr />
      <h4>Getting Started</h4>
      <p>
        To begin, you must be a logged-in user. If you don't have an account, you can sign up in seconds. Once you're logged in, you can click the "List Materials" button in the header at any time.
      </p>
      <h4>Tips for a Great Listing</h4>
      <ul>
        <li><strong>Clear Title:</strong> Use a descriptive title like "100 Red Clay Bricks" or "5 Gallon Unused Interior Paint".</li>
        <li><strong>High-Quality Photos:</strong> Upload clear photos from multiple angles. This is the most important part!</li>
        <li><strong>Detailed Description:</strong> Include dimensions, brand, color, condition, and any defects.</li>
        <li><strong>Fair Price:</strong> Research similar items or consider listing for free to clear out space quickly.</li>
      </ul>
      <Link to="/listings/new" className="btn btn-orange mt-3">
        Go to the Listing Form
      </Link>
    </Container>
  );
};

export default CreateListingInfoPage;