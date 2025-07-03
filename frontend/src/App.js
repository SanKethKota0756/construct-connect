// frontend/src/App.js - FULLY UPDATED

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateListingPage from './pages/CreateListingPage';
import ListingDetailPage from './pages/ListingDetailPage';
import ListingEditPage from './pages/ListingEditPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import UserProfilePage from './pages/UserProfilePage';
import BrowsePage from './pages/BrowsePage'; // 1. Import the new page

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
              <Route path="/profile/:id" element={<UserProfilePage />} />
              
              {/* 2. Add the new routes for browsing */}
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/browse/page/:pageNumber" element={<BrowsePage />} />

              {/* Private Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-listing" element={<CreateListingPage />} />
              <Route path="/listing/:id/edit" element={<ListingEditPage />} />
              <Route path="/profile-settings" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;