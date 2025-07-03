// frontend/src/components/Paginate.jsx - CORRECTED VERSION

import React from 'react';
import { Pagination } from 'react-bootstrap';
// 1. We now import Link from react-router-dom instead of LinkContainer
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '', location = '' }) => {
  if (pages <= 1) {
    return null;
  }

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
        // 2. We now wrap the Pagination.Item inside a standard Link component
        <Link key={x + 1} to={getBaseUrl(x + 1)} className="page-link">
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </Link>
      ))}
    </Pagination>
  );
};

export default Paginate;