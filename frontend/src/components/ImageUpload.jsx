// frontend/src/components/ImageUpload.jsx - CLEANED AND UPDATED

import React, { useState } from 'react'; // useContext removed
import { Form, Button, Image, Spinner } from 'react-bootstrap';
import API from '../api';
// AuthContext import removed
import { Upload } from 'react-bootstrap-icons';

const ImageUpload = ({ onUploadSuccess }) => {
  // userInfo is no longer needed here
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const fileSelectedHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) { setError('Please select an image file (jpg, jpeg, png).'); return; }
      if (selectedFile.size > 5 * 1024 * 1024) { setError('File size cannot exceed 5MB.'); return; }
      setError('');
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadFileHandler = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setError('');

    try {
      // The API call no longer needs the token passed manually
      const { data } = await API.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      onUploadSuccess(data.imageUrl); 
      setUploading(false);
      setPreview('');
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