// frontend/src/components/Header.jsx - FINAL CORRECTED VERSION

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api'; // 1. CHANGED: Use our central API instance instead of axios
import { 
  BoxArrowInRight, Plus, WrenchAdjustable, PersonCircle, BoxSeam, 
  ChatDots, BoxArrowLeft, Building, GearFill 
} from 'react-bootstrap-icons';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const checkForListings = async () => {
      if (userInfo && userInfo.token) {
        try {
          // 2. CHANGED: Use API.get() and remove the manual config object.
          // This now correctly calls your live Render backend.
          const { data } = await API.get('/api/listings/my-listings');
          
          if (data.length > 0) {
            setIsSeller(true);
          } else {
            setIsSeller(false);
          }
        } catch (error) {
          console.error("Could not check for user's listings", error);
          setIsSeller(false);
        }
      } else {
        setIsSeller(false);
      }
    };

    checkForListings();
  }, [userInfo]);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-3" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center" style={{ color: 'var(--brand-orange)' }}>
          <WrenchAdjustable className="me-2" /> ConstructConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            {userInfo ? (
              // If user IS logged in, decide which menu to show
              <>
                <Link to="/create-listing" className="btn-link-wrapper">
                    <Button variant="orange" className="btn-orange d-flex align-items-center me-3">
                        <Plus size={24} className="me-1"/> List Materials
                    </Button>
                </Link>

                {isSeller ? (
                  // --- SELLER MENU ---
                  <NavDropdown title={<><PersonCircle size={24} className="me-2" /><span>{userInfo.name}</span></>} id="seller-dropdown" align="end">
                    <NavDropdown.Item as={Link} to="/dashboard"><BoxSeam className="me-2" /> Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/messages"><ChatDots className="me-2" /> Messages</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout} className="text-danger"><BoxArrowLeft className="me-2" /> Log Out</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  // --- BUYER MENU ---
                  <NavDropdown title={<><PersonCircle size={24} className="me-2" /><span>{userInfo.name}</span></>} id="buyer-dropdown" align="end">
                    <NavDropdown.Item as={Link} to="/profile-settings"><GearFill className="me-2" /> Profile Settings</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/messages"><ChatDots className="me-2" /> Messages</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/create-listing"><Building className="me-2" /> Become a Seller</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout} className="text-danger"><BoxArrowLeft className="me-2" /> Log Out</NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            ) : (
              // If user is NOT logged in, show these buttons
              <>
                <Link to="/login" className="btn-link-wrapper me-3"><Button variant="orange" className="btn-orange d-flex align-items-center"><BoxArrowInRight className="me-2" /> Log In</Button></Link>
                <Link to="/signup" className="btn-link-wrapper"><Button variant="orange" className="btn-orange d-flex align-items-center"><Plus size={24} className="me-1" /> Sign Up</Button></Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;