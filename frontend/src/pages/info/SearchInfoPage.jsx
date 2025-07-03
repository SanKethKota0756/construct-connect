// frontend/src/pages/info/SearchInfoPage.jsx - NEW FILE

import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchInfoPage = () => {
  return (
    <Container className="py-5">
      <h1>Searching for Materials</h1>
      <p>
        You can find surplus materials by using the powerful search bar located at the top of the homepage. 
        You can filter by keywords, location, and price range to find exactly what you need for your next project.
      </p>
      <Link to="/" className="btn btn-orange">Go to Homepage to Search</Link>
    </Container>
  );
};

export default SearchInfoPage;