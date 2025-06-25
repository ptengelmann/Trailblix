import express from 'express';
import User from '../models/User.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// ✅ POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email, skills, education, interests } = req.body;
    log("📩 Incoming user submission", req.body);

    const newUser = new User({ name, email, skills, education, interests });
    await newUser.save();

    log("✅ User saved to DB", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    log("❌ Error saving user", err);
    res.status(500).json({ error: 'User creation failed' });
  }
});

// ✅ GET /api/users - return all users (TEMP)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.status(200).json(users);
  } catch (err) {
    log("❌ Error fetching users", err);
    res.status(500).json({ error: 'Could not retrieve users' });
  }
});

export default router;
