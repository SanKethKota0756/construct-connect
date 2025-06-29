// frontend/src/components/Layout.jsx - UPDATED

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  // Add '/profile-settings' to the list of pages that should not have a footer
  const noFooterPages = [
    '/signup', 
    '/login', 
    '/dashboard', 
    '/create-listing', 
    '/profile-settings' // <-- Add the new page here
  ]; 

  const showFooter = !noFooterPages.includes(location.pathname);

  return (
    <div>
      <Header />
      <main className="main-content">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;