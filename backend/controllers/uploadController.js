// backend/controllers/uploadController.js

const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded.');
    }
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'construct-connect',
      resource_type: 'auto',
    });

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error(error); // Log the full error to the console
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { uploadImage };