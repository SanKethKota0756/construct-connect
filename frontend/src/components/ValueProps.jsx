import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search, ShieldCheck, Recycle } from 'react-bootstrap-icons';

const ValueProps = () => {
  return (
    <div className="py-5" style={{ backgroundColor: 'var(--brand-off-white)' }}>
      <Container>
        <h2 className="text-center fw-bold mb-5">Why Choose ConstructConnect?</h2>
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="value-prop-icon-wrapper bg-orange-light mx-auto">
              <Search size={32} color="var(--brand-orange)" />
            </div>
            <h4 className="fw-bold mt-3">Local Search</h4>
            <p className="text-muted">Find materials in your area and reduce transportation costs.</p>
          </Col>
          <Col md={4} className="mb-4">
             <div className="value-prop-icon-wrapper bg-blue-light mx-auto">
              <ShieldCheck size={32} color="#0d6efd" />
            </div>
            <h4 className="fw-bold mt-3">Safe Trading</h4>
            <p className="text-muted">Built-in messaging system for secure communication.</p>
          </Col>
          <Col md={4} className="mb-4">
            <div className="value-prop-icon-wrapper bg-green-light mx-auto">
              <Recycle size={32} color="#198754" />
            </div>
            <h4 className="fw-bold mt-3">Reduce Waste</h4>
            <p className="text-muted">Give materials a second life and help the environment.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ValueProps;