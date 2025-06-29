// backend/server.js - COMPLETE AND FINAL VERSION

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');

// Route imports
const userRoutes = require('./routes/userRoutes.js');
const listingRoutes = require('./routes/listingRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js'); // For image uploads

// Middleware imports
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

// --- Initial Configuration ---
connectDB();
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing to allow our frontend to communicate with the backend
app.use(cors());
// Allow the server to accept and parse JSON in the body of requests
app.use(express.json());

// --- Basic Route for Testing ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- API Routes ---
// Any request to /api/users will be handled by userRoutes
app.use('/api/users', userRoutes);
// Any request to /api/listings will be handled by listingRoutes
app.use('/api/listings', listingRoutes);
// Any request to /api/upload will be handled by uploadRoutes
app.use('/api/upload', uploadRoutes);

// --- ERROR HANDLING MIDDLEWARE ---
// These must be the last pieces of middleware to be used
app.use(notFound);
app.use(errorHandler);

// --- Server Listening ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});