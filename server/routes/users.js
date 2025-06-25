import express from 'express';
import User from '../models/User.js';
import { log } from '../utils/logger.js';


const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email, skills, education, interests } = req.body;
    const newUser = new User({ name, email, skills, education, interests });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('User creation failed:', err);
    res.status(500).json({ error: 'User creation failed' });
  }

  log("📩 Incoming user submission", req.body);
const newUser = new User({ name, email, skills, education, interests });
await newUser.save();
log("✅ User saved to DB", newUser);
});

export default router;
