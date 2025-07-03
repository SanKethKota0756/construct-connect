// frontend/src/components/Paginate.jsx - NEW FILE

import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = '', location = '' }) => {
  // Don't show pagination if there's only one page or no pages
  if (pages <= 1) {
    return null;
  }

  // Construct the base URL for search or browse
  const getBaseUrl = (pageNum) => {
    if (keyword || location) {
      const searchParams = new URLSearchParams({ keyword, location, page: pageNum }).toString();
      return `/search?${searchParams}`;
    }
    return `/browse/page/${pageNum}`;
  };

  return (
    <Pagination className="justify-content-center my-4">
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer key={x + 1} to={getBaseUrl(x + 1)}>
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;