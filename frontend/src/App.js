// frontend/src/App.js - COMPLETE AND FINAL VERSION

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Context Providers
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';

// Import Components
import Layout from './components/Layout';

// Import Pages
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateListingPage from './pages/CreateListingPage';
import ListingDetailPage from './pages/ListingDetailPage';
import ListingEditPage from './pages/ListingEditPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import BrowsePage from './pages/BrowsePage';
import UserProfilePage from './pages/UserProfilePage'; // The new Public Profile page

// Import Styles
import './App.css'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/listing/:id" element={<ListingDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} /> {/* New Public Profile Route */}

              {/* Private/User-Specific Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-listing" element={<CreateListingPage />} />
              <Route path="/listing/:id/edit" element={<ListingEditPage />} />
              <Route path="/profile-settings" element={<ProfilePage />} />
              <Route path="/browse" element={<BrowsePage />} />
            </Routes>
          </Layout>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;