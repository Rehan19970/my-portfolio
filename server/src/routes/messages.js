import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';
import { sendContactEmail } from '../utils/sendEmail.js';

const router = express.Router();

// @route   POST /api/messages
// Public - contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    // 1. Database mein save karo
    const msg = await Message.create({ name, email, subject, message });
    console.log('💾 Message saved to DB:', msg._id);

    // 2. Email bhejo
    try {
      await sendContactEmail({ name, email, subject, message });
      console.log('✅ Email sent to', process.env.EMAIL_TO || process.env.EMAIL_USER);
    } catch (emailErr) {
      console.error('⚠️  Email failed:', emailErr.message);
      // Email fail hone pe bhi response OK (message DB mein save ho gaya)
    }

    res.status(201).json({
      message: 'Message sent successfully',
      _id: msg._id,
    });
  } catch (error) {
    console.error('❌ Message route error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/messages
// Admin only - saare messages
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/messages/:id/read
// Admin only - mark as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Not found' });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/messages/:id
// Admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;