// backend/models/listingModel.js - UPDATED

const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    unit: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    isFree: { type: Boolean, required: true, default: false },
    images: [{ type: String, required: true }],
    zipCode: { type: String, required: true },
    
    // --- ADD THE NEW FIELD HERE ---
    location: {
      type: String, // e.g., "Brooklyn, NY"
      required: true,
    },

    status: { type: String, required: true, default: 'Active' },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;