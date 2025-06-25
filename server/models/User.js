// models/User.js
import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  yearsOfExperience: { type: Number, default: 0 },
  verified: { type: Boolean, default: false }
});

const CareerGoalSchema = new mongoose.Schema({
  title: String,
  timeframe: String,
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
});

const UserProfileSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  
  // Professional Background
  currentRole: String,
  yearsOfExperience: { type: Number, default: 0 },
  education: {
    level: { type: String, enum: ['high-school', 'associate', 'bachelor', 'master', 'phd', 'bootcamp', 'self-taught'] },
    field: String,
    institution: String,
    graduationYear: Number
  },
  
  // Skills (Enhanced)
  skills: [SkillSchema],
  
  // Interests & Personality
  interests: [String],
  personality: [String],
  workValues: [String], // e.g., ['work-life-balance', 'high-salary', 'creativity']
  
  // Preferences
  preferences: {
    workEnvironment: { type: String, enum: ['remote', 'hybrid', 'office'] },
    industries: [String],
    salaryRange: {
      min: Number,
      max: Number
    },
    location: {
      city: String,
      state: String,
      country: String,
      willingToRelocate: { type: Boolean, default: false }
    }
  },
  
  // Career Journey
  careerGoals: [CareerGoalSchema],
  completedAssessments: [{
    type: { type: String, enum: ['personality', 'skills', 'interests', 'values'] },
    results: mongoose.Schema.Types.Mixed,
    completedAt: { type: Date, default: Date.now }
  }],
  
  // AI Interactions
  careerRecommendations: [{
    careerId: String,
    confidence: Number,
    generatedAt: { type: Date, default: Date.now },
    feedback: String // user feedback on recommendation
  }],
  
  // Progress Tracking
  learningPlan: [{
    skill: String,
    resources: [String],
    progress: { type: Number, default: 0 }, // 0-100
    startDate: Date,
    targetDate: Date
  }],
  
  // Engagement Data
  onboardingCompleted: { type: Boolean, default: false },
  profileCompleteness: { type: Number, default: 0 }, // 0-100
  lastActive: { type: Date, default: Date.now },
  totalSessions: { type: Number, default: 0 }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for profile completion percentage
UserProfileSchema.virtual('completionPercentage').get(function() {
  let completed = 0;
  const total = 10;
  
  if (this.name) completed++;
  if (this.email) completed++;
  if (this.currentRole) completed++;
  if (this.skills && this.skills.length > 0) completed++;
  if (this.interests && this.interests.length > 0) completed++;
  if (this.education && this.education.level) completed++;
  if (this.preferences && this.preferences.workEnvironment) completed++;
  if (this.careerGoals && this.careerGoals.length > 0) completed++;
  if (this.personality && this.personality.length > 0) completed++;
  if (this.workValues && this.workValues.length > 0) completed++;
  
  return Math.round((completed / total) * 100);
});

// Update profile completeness before saving
UserProfileSchema.pre('save', function(next) {
  this.profileCompleteness = this.completionPercentage;
  this.lastActive = new Date();
  next();
});

const User = mongoose.model('User', UserProfileSchema);
export default User;