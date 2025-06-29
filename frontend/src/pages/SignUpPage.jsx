// frontend/src/pages/SignUpPage.jsx - COMPLETE AND UPDATED

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WrenchAdjustable } from 'react-bootstrap-icons';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState(''); // <-- New state for phone number
  const [error, setError] = useState(null);

  const { signup } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Call the global signup function, now including the phone number
      await signup(name, email, password, zipCode, phone);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <Container fluid>
      <Row className="signup-container">
        <Col md={6} lg={7} className="d-none d-md-flex flex-column justify-content-center align-items-center text-white signup-image-panel p-5">
          <WrenchAdjustable size={60} className="mb-3" style={{ color: 'var(--brand-orange)' }} />
          <h1 className="display-4 fw-bold">Reduce Waste.</h1>
          <h1 className="display-4 fw-bold">Build Better.</h1>
          <p className="lead mt-3 text-white-50">Join a community of builders helping the planet and their pockets.</p>
        </Col>

        <Col md={6} lg={5} className="d-flex flex-column justify-content-center p-5 signup-form-panel">
          <h1 className="mb-4 text-center text-md-start">Create Your Account</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name"><Form.Label>Name</Form.Label><Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3" controlId="email"><Form.Label>Email Address</Form.Label><Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3" controlId="password"><Form.Label>Password</Form.Label><Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword"><Form.Label>Confirm Password</Form.Label><Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></Form.Group>
            
            {/* New Optional Phone Number Field */}
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="zipCode"><Form.Label>Zip Code</Form.Label><Form.Control type="text" placeholder="Enter your Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required /></Form.Group>
            <Button type="submit" variant="orange" className="btn-orange w-100 py-2">Sign Up</Button>
          </Form>
          <div className="mt-3 text-center text-md-start"><small>Have an Account? <Link to="/login">Log In</Link></small></div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;