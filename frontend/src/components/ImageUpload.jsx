// frontend/src/components/ImageUpload.jsx

import React, { useState, useContext } from 'react';
import { Form, Button, Image, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Upload } from 'react-bootstrap-icons';

const ImageUpload = ({ onUploadSuccess }) => {
  const { userInfo } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const fileSelectedHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Basic validation for file type and size
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file (jpg, jpeg, png).');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size cannot exceed 5MB.');
        return;
      }

      setError('');
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadFileHandler = async () => {
    if (!file) return;

    const formData = new FormData();
    // 'image' must match the backend: upload.single('image')
    formData.append('image', file); 
    setUploading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      
      // Call the parent component's function with the new image URL
      onUploadSuccess(data.imageUrl); 
      setUploading(false);
      setPreview(''); // Clear preview after successful upload
      setFile(null);

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Image upload failed');
      setUploading(false);
    }
  };

  return (
    <div className="mb-3 border p-3 rounded bg-light">
      <Form.Label className="fw-bold">Upload Photos *</Form.Label>
      {preview && (
        <div className="text-center mb-3">
          <Image src={preview} thumbnail fluid style={{ maxHeight: '200px' }} />
        </div>
      )}
      
      <div className="d-flex align-items-center">
        <Form.Control type="file" onChange={fileSelectedHandler} className="me-2" disabled={uploading} />
        <Button onClick={uploadFileHandler} disabled={!file || uploading} variant="secondary">
          {uploading ? <Spinner as="span" animation="border" size="sm" /> : <Upload />}
          <span className="ms-2 d-none d-sm-inline">Upload</span>
        </Button>
      </div>
      {error && <Form.Text className="text-danger mt-2 d-block">{error}</Form.Text>}
      <Form.Text className="text-muted">
        Upload up to 5 photos (JPG, PNG). Max 5MB each.
      </Form.Text>
    </div>
  );
};

export default ImageUpload;