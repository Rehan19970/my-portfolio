import express from 'express';
import { upload, uploadToCloudinary } from '../utils/upload.js';
import { protect } from '../middleware/auth.js';
import Settings from '../models/Settings.js';

const router = express.Router();

// @route   POST /api/upload/resume
// Admin only - resume PDF upload
router.post('/resume', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Resume must be a PDF' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/resume');

    // Settings mein save karo
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    settings.resumeUrl = result.secure_url;
    settings.resumeFileName = req.file.originalname;
    await settings.save();

    res.json({
      message: 'Resume uploaded successfully',
      resumeUrl: result.secure_url,
      resumeFileName: req.file.originalname,
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/image
// Admin only - project images
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');

    res.json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;