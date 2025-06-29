// frontend/src/pages/ListingEditPage.jsx - CORRECTED

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// The 'Image' component is now correctly imported here
import { Container, Form, Button, Row, Col, Alert, Card, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';

const ListingEditPage = () => {
  const { id: listingId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for all form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${listingId}`);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setCondition(data.condition);
        setQuantity(data.quantity);
        setUnit(data.unit);
        setPrice(data.price);
        setIsFree(data.isFree);
        setZipCode(data.zipCode);
        setLocation(data.location);
        setImages(data.images);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch listing details. It may have been deleted.');
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const handleUploadSuccess = (imageUrl) => {
    if (images.length >= 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }
    setImages([...images, imageUrl]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      const listingData = { title, description, category, condition, quantity, unit, price, isFree, zipCode, location, images };
      
      await axios.put(`/api/listings/${listingId}`, listingData, config);

      setSuccess('Listing updated successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-1">Edit Listing</h1>
          <p className="text-muted mb-4">Update the details of your material listing.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={submitHandler}>
            <Card className="p-4 shadow-sm">
                <h4 className="mb-3">Listing Details</h4>
                <Form.Group className="mb-3" controlId="title"><Form.Label>Title *</Form.Label><Form.Control type="text" placeholder="e.g., 100 Red Clay Bricks" value={title} onChange={(e) => setTitle(e.target.value)} required /></Form.Group>
                <ImageUpload onUploadSuccess={handleUploadSuccess} />
                {images.length > 0 && (<div className="mb-3 border p-3 rounded"><p className="fw-bold">Uploaded Photos ({images.length}/5):</p><Row>{images.map((imgUrl, index) => (<Col xs={4} md={3} key={index} className="mb-2"><Image src={imgUrl} thumbnail fluid /></Col>))}</Row></div>)}
                <Form.Group className="mb-3" controlId="category"><Form.Label>Category *</Form.Label><Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required><option value="">Select a category</option><option value="Masonry & Concrete">Masonry & Concrete</option><option value="Lumber & Framing">Lumber & Framing</option><option value="Drywall & Insulation">Drywall & Insulation</option><option value="Roofing & Siding">Roofing & Siding</option><option value="Doors & Windows">Doors & Windows</option><option value="Flooring">Flooring</option><option value="Tiles & Stone">Tiles & Stone</option><option value="Paint & Finishes">Paint & Finishes</option><option value="Plumbing">Plumbing</option><option value="Electrical">Electrical</option><option value="HVAC">HVAC</option><option value="Hardware">Hardware</option><option value="Tools & Equipment">Tools & Equipment</option><option value="Landscaping & Outdoor">Landscaping & Outdoor</option><option value="Other Surplus">Other Surplus</option></Form.Select></Form.Group>
                <Form.Group className="mb-3" controlId="description"><Form.Label>Description *</Form.Label><Form.Control as="textarea" rows={3} placeholder="Describe the materials..." value={description} onChange={(e) => setDescription(e.target.value)} required /></Form.Group>
                <Row><Col md={6}><Form.Group className="mb-3" controlId="quantity"><Form.Label>Quantity *</Form.Label><Form.Control type="number" placeholder="e.g., 200" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></Form.Group></Col><Col md={6}><Form.Group className="mb-3" controlId="unit"><Form.Label>Unit *</Form.Label><Form.Control type="text" placeholder="e.g., pieces" value={unit} onChange={(e) => setUnit(e.target.value)} required /></Form.Group></Col></Row>
                <Form.Group className="mb-3" controlId="condition"><Form.Label>Condition *</Form.Label><Form.Select value={condition} onChange={(e) => setCondition(e.target.value)} required><option value="">Select condition</option><option value="New/Unused">New / Unused</option><option value="Lightly Used">Lightly Used</option><option value="Scrap/For Parts">Scrap / For Parts</option></Form.Select></Form.Group>
                <Form.Group className="mb-3" controlId="isFree"><Form.Check type="checkbox" label="List for free" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} /></Form.Group>
                {!isFree && (<Form.Group className="mb-3" controlId="price"><Form.Label>Price (₹)</Form.Label><Form.Control type="number" placeholder="e.g., 2500" value={price} onChange={(e) => setPrice(e.target.value)} /></Form.Group>)}
                <Form.Group className="mb-3" controlId="zipCode"><Form.Label>Zip Code *</Form.Label><Form.Control type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required /></Form.Group>
                <Form.Group className="mb-3" controlId="location"><Form.Label>Location *</Form.Label><Form.Control type="text" placeholder="e.g., Brooklyn, NY" value={location} onChange={(e) => setLocation(e.target.value)} required /><Form.Text className="text-muted">Please provide a general location like City, State. Do not use your full address.</Form.Text></Form.Group>
                <Button type="submit" variant="dark" className="w-100 py-2 fw-bold">Update Listing</Button>
            </Card>
          </Form>

        </Col>
      </Row>
    </Container>
  );
};

export default ListingEditPage;