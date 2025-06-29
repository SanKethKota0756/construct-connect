// backend/routes/userRoutes.js - COMPLETE AND FINAL VERSION

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController.js');
const { getUserListings } = require('../controllers/listingController.js'); // Import from listing controller
const { protect } = require('../middleware/authMiddleware.js');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Private profile route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Public route to get a user's listings
router.get('/:id/listings', getUserListings);

module.exports = router;