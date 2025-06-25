// server/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { log } from '../utils/logger.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'trailblix-secret-key',
    { expiresIn: '7d' }
  );
};

// ✅ POST /api/auth/register - User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    log('📝 Registration attempt', { name, email });

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Name, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      onboardingCompleted: false
    });

    await newUser.save();
    log('✅ User registered successfully', newUser._id);

    // Generate token
    const token = generateToken(newUser._id);

    // Return user data (excluding password)
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      onboardingCompleted: newUser.onboardingCompleted,
      completionPercentage: newUser.completionPercentage,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    log('❌ Registration error', error);
    res.status(500).json({ 
      error: 'Registration failed. Please try again.' 
    });
  }
});

// ✅ POST /api/auth/login - User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    log('🔐 Login attempt', { email });

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Update last active
    user.lastActive = new Date();
    user.totalSessions = (user.totalSessions || 0) + 1;
    await user.save();

    log('✅ User logged in successfully', user._id);

    // Generate token
    const token = generateToken(user._id);

    // Return user data (excluding password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      currentRole: user.currentRole,
      yearsOfExperience: user.yearsOfExperience,
      skills: user.skills,
      interests: user.interests,
      personality: user.personality,
      workValues: user.workValues,
      preferences: user.preferences,
      onboardingCompleted: user.onboardingCompleted,
      completionPercentage: user.completionPercentage,
      createdAt: user.createdAt,
      lastActive: user.lastActive
    };

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    log('❌ Login error', error);
    res.status(500).json({ 
      error: 'Login failed. Please try again.' 
    });
  }
});

// ✅ GET /api/auth/verify - Verify token and get user data
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    log('🔍 Token verification', req.user._id);

    const userResponse = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      currentRole: req.user.currentRole,
      yearsOfExperience: req.user.yearsOfExperience,
      skills: req.user.skills,
      interests: req.user.interests,
      personality: req.user.personality,
      workValues: req.user.workValues,
      preferences: req.user.preferences,
      onboardingCompleted: req.user.onboardingCompleted,
      completionPercentage: req.user.completionPercentage,
      createdAt: req.user.createdAt,
      lastActive: req.user.lastActive
    };

    res.status(200).json({
      valid: true,
      user: userResponse
    });

  } catch (error) {
    log('❌ Token verification error', error);
    res.status(500).json({ 
      error: 'Verification failed' 
    });
  }
});

// ✅ POST /api/auth/logout - Logout (client-side token removal)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    log('👋 User logout', req.user._id);
    
    // Update last active timestamp
    req.user.lastActive = new Date();
    await req.user.save();

    res.status(200).json({ 
      message: 'Logout successful' 
    });

  } catch (error) {
    log('❌ Logout error', error);
    res.status(500).json({ 
      error: 'Logout failed' 
    });
  }
});

export default router;