// frontend/src/pages/DashboardPage.jsx - FULLY CORRECTED

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Button, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api';
import DashboardListingItem from '../components/DashboardListingItem';
import EmptyState from '../components/EmptyState';
import { ListTask } from 'react-bootstrap-icons';

const DashboardPage = () => {
  const { userInfo } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchMyListings = React.useCallback(async () => {
    if (!userInfo || !userInfo.token) { setLoading(false); return; }
    try {
      setLoading(true);
      const { data } = await API.get('/api/listings/my-listings');
      setMyListings(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not fetch listings.');
      setLoading(false);
    }
  }, [userInfo]);

  useEffect(() => { fetchMyListings(); }, [fetchMyListings]);

  const markAsSoldHandler = async (id) => {
    setSuccess(''); setError('');
    if (window.confirm('Are you sure you want to mark this item as sold?')) {
      try {
        await API.put(`/api/listings/${id}/sold`);
        setSuccess('Listing marked as sold successfully!');
        fetchMyListings();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const deleteHandler = async (id) => {
    setSuccess('');
    setError('');
    if (window.confirm('Are you sure you want to permanently delete this listing? This action cannot be undone.')) {
      try {
        await API.delete(`/api/listings/${id}`);
        setSuccess('Listing deleted successfully!');
        fetchMyListings();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const activeListings = myListings.filter(listing => listing.status === 'Active');
  const soldListings = myListings.filter(listing => listing.status === 'Sold');

  return (
    <Container className="py-5">
      <Row className="align-items-center mb-4">
        <Col><h1>Dashboard</h1><p className="text-muted">Manage your listings and messages</p></Col>
        <Col className="text-end"><Link to="/create-listing"><Button variant="orange" className="btn-orange">+ Create New Listing</Button></Link></Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}><Card body className="text-center shadow-sm"><Card.Title>Active Listings</Card.Title><Card.Text className="fs-2 fw-bold">{activeListings.length}</Card.Text></Card></Col>
        
        {/* THIS IS THE CORRECTED LINE */}
        <Col md={4}><Card body className="text-center shadow-sm"><Card.Title>Sold Items</Card.Title><Card.Text className="fs-2 fw-bold">{soldListings.length}</Card.Text></Card></Col>
        
        <Col md={4}><Card body className="text-center shadow-sm"><Card.Title>Messages</Card.Title><Card.Text className="fs-2 fw-bold">0</Card.Text></Card></Col>
      </Row>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Tabs defaultActiveKey="active" id="listings-tabs" className="mb-3" fill>
          <Tab eventKey="active" title={`Active Listings (${activeListings.length})`}>
            {activeListings.length === 0 ? (
              <EmptyState icon={ListTask} title="You don't have any active listings yet." message="Ready to clear out some space? List your surplus materials now." buttonText="+ Create Your First Listing" buttonLink="/create-listing" />
            ) : (
              <div>
                {activeListings.map(listing => (
                  <DashboardListingItem key={listing._id} listing={listing} onMarkAsSold={markAsSoldHandler} onDelete={deleteHandler} />
                ))}
              </div>
            )}
          </Tab>
          <Tab eventKey="sold" title={`Sold Items (${soldListings.length})`}>
            {soldListings.length === 0 ? (
              <EmptyState icon={ListTask} title="No sold items yet." message="Once you mark an item as sold, it will appear here." showButton={false} />
            ) : (
              <div>
                {soldListings.map(listing => (
                  <DashboardListingItem key={listing._id} listing={listing} onMarkAsSold={markAsSoldHandler} onDelete={deleteHandler} />
                ))}
              </div>
            )}
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default DashboardPage;