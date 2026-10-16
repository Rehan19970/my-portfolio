import express from 'express';
import Settings from '../models/Settings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper: get or create settings
async function getSettings() {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      stats: [
        { value: 5, label: 'Projects Completed' },
        { value: 2, label: 'Happy Clients' },
        { value: 1, label: 'Years of Learning' },
      ],
      facts: [
        { label: 'Name', value: 'Rehan' },
        { label: 'Role', value: 'Web Developer' },
        { label: 'Email', value: 'your@email.com' },
        { label: 'Availability', value: 'Open for freelance' },
      ],
    });
  }
  return settings;
}

// @route   GET /api/settings
// Public - saari settings
router.get('/', async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/settings
// Admin only - update settings
router.put('/', protect, async (req, res) => {
  try {
    let settings = await getSettings();
    settings = await Settings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/settings/resume
// Admin only - resume URL update (upload ke baad)
router.put('/resume', protect, async (req, res) => {
  try {
    const { resumeUrl, resumeFileName } = req.body;
    let settings = await getSettings();
    settings.resumeUrl = resumeUrl;
    settings.resumeFileName = resumeFileName;
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;