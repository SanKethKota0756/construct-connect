// backend/controllers/listingController.js - COMPLETE AND FINAL VERSION

const Listing = require('../models/listingModel.js');
const User = require('../models/userModel.js'); // Ensure User model is imported

const getListings = async (req, res) => {
  const query = { status: 'Active' };
  if (req.query.keyword) { query.$or = [{ title: { $regex: req.query.keyword, $options: 'i' } }, { description: { $regex: req.query.keyword, $options: 'i' } }]; }
  if (req.query.location) { query.location = { $regex: req.query.location, $options: 'i' }; }
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) { query.price.$gte = Number(req.query.minPrice); }
    if (req.query.maxPrice) { query.price.$lte = Number(req.query.maxPrice); }
  }
  const listings = await Listing.find(query).sort({ createdAt: -1 });
  res.json(listings);
};

const createListing = async (req, res) => {
  const { title, description, category, condition, quantity, unit, price, isFree, images, zipCode, location } = req.body;
  const listing = new Listing({
    user: req.user._id,
    title, description, category, condition, quantity, unit, price, isFree, images, zipCode, location,
  });
  const createdListing = await listing.save();
  res.status(201).json(createdListing);
};

const getMyListings = async (req, res) => {
  const listings = await Listing.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(listings);
};

const getListingById = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('user', 'name email phone');
  if (listing) {
    res.json(listing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
};

const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (listing) {
    if (listing.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('User not authorized'); }
    listing.title = req.body.title || listing.title;
    listing.description = req.body.description || listing.description;
    listing.category = req.body.category || listing.category;
    listing.condition = req.body.condition || listing.condition;
    listing.quantity = req.body.quantity || listing.quantity;
    listing.unit = req.body.unit || listing.unit;
    listing.price = req.body.price ?? listing.price;
    listing.isFree = req.body.isFree ?? listing.isFree;
    listing.images = req.body.images || listing.images;
    listing.zipCode = req.body.zipCode || listing.zipCode;
    listing.location = req.body.location || listing.location;
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
};

const updateListingToSold = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (listing) {
    if (listing.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized to update this listing'); }
    listing.status = 'Sold';
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
};

const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (listing) {
    if (listing.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
};

// @desc    Fetch all active listings for a specific user (public)
// @route   GET /api/users/:id/listings
// @access  Public
const getUserListings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const listings = await Listing.find({ user: req.params.id, status: 'Active' });
    
    // Send back public user info and their listings
    res.json({
      user: { name: user.name, createdAt: user.createdAt },
      listings,
    });
  } catch (error) {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = {
  getListings,
  createListing,
  getMyListings,
  getListingById,
  updateListing,
  updateListingToSold,
  deleteListing,
  getUserListings,
};