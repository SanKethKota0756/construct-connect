// frontend/src/pages/LoginPage.jsx - Updated to use AuthContext

import React, { useState, useContext } from 'react'; // 1. Import useContext
import { AuthContext } from '../context/AuthContext'; // 2. Import AuthContext
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WrenchAdjustable } from 'react-bootstrap-icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const { login } = useContext(AuthContext); // 3. Get the login function from context

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 4. Call the global login function
      await login(email, password);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  // ... The rest of the return(...) JSX is exactly the same
  return (
    <Container fluid>
      <Row className="signup-container">
        <Col md={6} lg={7} className="d-none d-md-flex flex-column justify-content-center align-items-center text-white signup-image-panel p-5">
          <WrenchAdjustable size={60} className="mb-3" style={{ color: 'var(--brand-orange)' }} />
          <h1 className="display-4 fw-bold">Welcome Back.</h1>
          <p className="lead mt-3 text-white-50">Log in to manage your listings and connect with buyers.</p>
        </Col>
        <Col md={6} lg={5} className="d-flex flex-column justify-content-center p-5 signup-form-panel">
          <h1 className="mb-4 text-center text-md-start">Log In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="orange" className="btn-orange w-100 py-2">Log In</Button>
          </Form>
          <div className="mt-3 text-center text-md-start">
            <small>New to ConstructConnect? <Link to="/signup">Create an Account</Link></small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;