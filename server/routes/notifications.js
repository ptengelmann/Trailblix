// server/routes/notifications.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// GET /api/notifications - Get user notifications
router.get('/', authenticateToken, async (req, res) => {
  try {
    log("🔔 Notifications request", req.user._id);
    
    // For now, return empty notifications or mock data
    // In a production app, you would fetch this from your database
    const notifications = [
      {
        id: '1',
        type: 'welcome',
        message: 'Welcome to Trailblix! Complete your profile to get personalized career recommendations.',
        date: new Date(),
        read: false
      },
      {
        id: '2',
        type: 'career_match',
        message: 'We found 3 new career matches based on your profile!',
        date: new Date(Date.now() - 86400000), // 1 day ago
        read: false
      }
    ];
    
    res.status(200).json(notifications);
    
  } catch (err) {
    log("❌ Notifications fetch error", err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

export default router;