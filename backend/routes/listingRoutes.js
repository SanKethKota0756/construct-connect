// backend/routes/listingRoutes.js - COMPLETE AND FINAL VERSION

const express = require('express');
const router = express.Router();
const {
  getListings,
  createListing,
  getMyListings,
  getListingById,
  updateListing,
  updateListingToSold,
  deleteListing,
} = require('../controllers/listingController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getListings).post(protect, createListing);
router.route('/my-listings').get(protect, getMyListings);
router
  .route('/:id')
  .get(getListingById)
  .put(protect, updateListing)
  .delete(protect, deleteListing); // <-- Added delete here
router.route('/:id/sold').put(protect, updateListingToSold);

module.exports = router;