// frontend/src/App.js - FULLY UPDATED

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Layout from './components/Layout';

// Import Main Pages
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ListingCreatePage from './pages/ListingCreatePage'; // The renamed form page
import ListingDetailPage from './pages/ListingDetailPage';
import ListingEditPage from './pages/ListingEditPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import BrowsePage from './pages/BrowsePage';
import ResultsPage from './pages/ResultsPage';

// Import Info Pages
import AboutUsPage from './pages/info/AboutUsPage';
import HowToBuyPage from './pages/info/HowToBuyPage';
import SafetyTipsPage from './pages/info/SafetyTipsPage';
import SellerGuidePage from './pages/info/SellerGuidePage';
import PricingTipsPage from './pages/info/PricingTipsPage';
import CareersPage from './pages/info/CareersPage';
import ContactPage from './pages/info/ContactPage';
import SearchInfoPage from './pages/info/SearchInfoPage';
import CreateListingInfoPage from './pages/info/CreateListingInfoPage'; // The new info page

import './App.css'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Layout>
            <Routes>
              {/* Main App Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/browse/page/:pageNumber" element={<BrowsePage />} />
              <Route path="/listing/:id" element={<ListingDetailPage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Private Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/listings/new" element={<ListingCreatePage />} /> {/* The new form route */}
              <Route path="/listing/:id/edit" element={<ListingEditPage />} />
              <Route path="/profile-settings" element={<ProfilePage />} />
              
              {/* Informational Pages from Footer */}
              <Route path="/create-listing" element={<CreateListingInfoPage />} /> {/* Info page route */}
              <Route path="/search" element={<SearchInfoPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/how-to-buy" element={<HowToBuyPage />} />
              <Route path="/safety-tips" element={<SafetyTipsPage />} />
              <Route path="/seller-guide" element={<SellerGuidePage />} />
              <Route path="/pricing-tips" element={<PricingTipsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;