// routes/users.js
import express from 'express';
import User from '../models/User.js';
import { log } from '../utils/logger.js';
import { authenticateToken } from '../middleware/auth.js';
import { suggestCareers, advancedCareerEngine } from '../ai/advancedCareerEngine.js';

const router = express.Router();

// ✅ POST /api/users - Create basic user (legacy support)
router.post('/', async (req, res) => {
  try {
    const { name, email, skills, education, interests } = req.body;
    log("📩 Legacy user submission", req.body);

    const newUser = new User({ 
      name, 
      email, 
      skills: skills || [], 
      education: education || '', 
      interests: interests || []
    });
    await newUser.save();

    log("✅ User saved to DB", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    log("❌ Error saving user", err);
    res.status(500).json({ error: 'User creation failed' });
  }
});

router.post('/profile', authenticateToken, async (req, res) => {
  try {
    const profileData = req.body;
    const userId = req.user._id;
    
    log("📩 Advanced profile submission", { userId, profileData });

    // Update the existing user instead of creating new one
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        currentRole: profileData.currentRole,
        yearsOfExperience: profileData.yearsOfExperience || 0,
        education: profileData.education || {},
        skills: profileData.skills || [],
        interests: profileData.interests || [],
        personality: profileData.personality || [],
        workValues: profileData.workValues || [],
        careerGoals: profileData.careerGoals || [],
        preferences: profileData.preferences || {},
        onboardingCompleted: true
      },
      { new: true, runValidators: true }
    );

    log("✅ Enhanced profile updated", updatedUser._id);

    // Generate career recommendations
    const careerMatches = advancedCareerEngine.generateCareerMatches(profileData);
    
    updatedUser.careerRecommendations = careerMatches.slice(0, 5).map(match => ({
      careerId: match.id,
      confidence: match.confidence,
      generatedAt: new Date()
    }));
    
    await updatedUser.save();

    res.status(200).json({
      user: updatedUser,
      careerRecommendations: careerMatches.slice(0, 8)
    });

  } catch (err) {
    log("❌ Error updating enhanced profile", err);
    res.status(500).json({ error: 'Enhanced profile update failed', details: err.message });
  }
});

// ✅ GET /api/users - Get all users (legacy support)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(users);
  } catch (err) {
    log("❌ Error fetching users", err);
    res.status(500).json({ error: 'Could not retrieve users' });
  }
});

// ✅ POST /api/users/suggest - Career suggestions (enhanced)
router.post('/suggest', async (req, res) => {
  try {
    const { skills = [], interests = [], ...otherData } = req.body;
    log("🤖 Career suggestion request", { skills, interests, otherData });

    // Validate input
    if (!Array.isArray(skills) && !Array.isArray(interests)) {
      return res.status(400).json({ 
        error: 'Invalid input: skills and interests must be arrays' 
      });
    }

    // Use enhanced engine if additional data provided, otherwise legacy
    let suggestions;
    
    if (otherData.personality || otherData.workValues || otherData.preferences) {
      // Use advanced engine
      const userProfile = {
        skills,
        interests,
        personality: otherData.personality || [],
        workValues: otherData.workValues || [],
        yearsOfExperience: otherData.yearsOfExperience || 0,
        preferences: otherData.preferences || {}
      };
      
      suggestions = advancedCareerEngine.generateCareerMatches(userProfile);
      log("🎯 Advanced AI suggestions generated", suggestions.length);
    } else {
      // Use legacy compatible function
      suggestions = suggestCareers(skills, interests);
      log("🔄 Legacy AI suggestions generated", suggestions.length);
    }

    res.json(suggestions);

  } catch (err) {
    log("❌ AI suggestion error", err);
    res.status(500).json({ 
      error: 'Career engine failed', 
      details: err.message,
      fallback: [
        { title: 'Career Exploration Needed', confidence: 50, category: 'General' }
      ]
    });
  }
});

// ✅ GET /api/users/:id/recommendations - Get detailed recommendations
router.get('/:id/recommendations', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate fresh recommendations using advanced engine
    const userProfile = {
      skills: user.skills || [],
      interests: user.interests || [],
      personality: user.personality || [],
      workValues: user.workValues || [],
      yearsOfExperience: user.yearsOfExperience || 0,
      preferences: user.preferences || {}
    };

    const recommendations = advancedCareerEngine.generateCareerMatches(userProfile);
    
    log("📊 Generated detailed recommendations for user", user._id);
    res.json({
      user: {
        name: user.name,
        profileCompleteness: user.completionPercentage
      },
      recommendations: recommendations.slice(0, 10),
      generatedAt: new Date()
    });

  } catch (err) {
    log("❌ Error generating recommendations", err);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// ✅ POST /api/users/:id/feedback - Store user feedback on recommendations
router.post('/:id/feedback', async (req, res) => {
  try {
    const { careerId, rating, feedback } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update recommendation with feedback
    const recommendation = user.careerRecommendations.find(rec => rec.careerId === careerId);
    if (recommendation) {
      recommendation.feedback = feedback;
      recommendation.rating = rating;
      await user.save();
    }

    log("📝 User feedback stored", { userId: user._id, careerId, rating });
    res.json({ success: true });

  } catch (err) {
    log("❌ Error storing feedback", err);
    res.status(500).json({ error: 'Failed to store feedback' });
  }
});

// GET /api/users/dashboard - Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    log("📊 Dashboard data request", req.user._id);
    
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate fresh career recommendations using advanced engine
    const userProfile = {
      skills: user.skills || [],
      interests: user.interests || [],
      personality: user.personality || [],
      workValues: user.workValues || [],
      yearsOfExperience: user.yearsOfExperience || 0,
      preferences: user.preferences || {}
    };
    
    const recommendations = advancedCareerEngine.generateCareerMatches(userProfile);
    
    // Return dashboard data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      currentRole: user.currentRole,
      yearsOfExperience: user.yearsOfExperience,
      skills: user.skills || [],
      interests: user.interests || [],
      personality: user.personality || [],
      workValues: user.workValues || [],
      preferences: user.preferences || {},
      onboardingCompleted: user.onboardingCompleted,
      completionPercentage: user.completionPercentage,
      careerGoals: user.careerGoals || [],
      careerRecommendations: recommendations.slice(0, 5).map(match => ({
        careerId: match.id,
        title: match.title,
        confidence: match.confidence,
        category: match.category
      }))
    });
    
  } catch (err) {
    log("❌ Dashboard fetch error", err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});


export default router;