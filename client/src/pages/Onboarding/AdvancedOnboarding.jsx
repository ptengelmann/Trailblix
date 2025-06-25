// pages/Onboarding/AdvancedOnboarding.jsx
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Heart, 
  Brain, 
  Target, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Zap,
  Users,
  Clock,
  DollarSign,
  Home,
  Coffee,
  Building,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // ADD THIS
import { useAuth } from '../../context/AuthContext';  // ADD THIS
import styles from './advancedOnboarding.module.scss';

const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'Welcome to Trailblix', component: 'WelcomeStep' },
  { id: 'basic-info', title: 'Tell us about yourself', component: 'BasicInfoStep' },
  { id: 'skills-assessment', title: 'Skills Assessment', component: 'SkillsStep' },
  { id: 'interests', title: 'What drives you?', component: 'InterestsStep' },
  { id: 'personality', title: 'Personality Insights', component: 'PersonalityStep' },
  { id: 'goals', title: 'Career Aspirations', component: 'GoalsStep' },
  { id: 'preferences', title: 'Work Preferences', component: 'PreferencesStep' },
  { id: 'completion', title: 'Profile Complete!', component: 'CompletionStep' }
];

const SKILLS_OPTIONS = [
  { name: 'JavaScript', category: 'Programming', icon: Code },
  { name: 'Python', category: 'Programming', icon: Code },
  { name: 'React', category: 'Frontend', icon: Code },
  { name: 'Node.js', category: 'Backend', icon: Code },
  { name: 'SQL', category: 'Database', icon: Code },
  { name: 'Figma', category: 'Design', icon: Star },
  { name: 'Photoshop', category: 'Design', icon: Star },
  { name: 'User Research', category: 'Design', icon: Users },
  { name: 'SEO', category: 'Marketing', icon: Globe },
  { name: 'Content Marketing', category: 'Marketing', icon: Globe },
  { name: 'Google Ads', category: 'Marketing', icon: Globe },
  { name: 'Excel', category: 'Analytics', icon: Target },
  { name: 'Data Analysis', category: 'Analytics', icon: Target },
  { name: 'Project Management', category: 'Management', icon: Briefcase },
  { name: 'Leadership', category: 'Management', icon: Users },
  { name: 'Communication', category: 'Soft Skills', icon: Users }
];

const INTERESTS_OPTIONS = [
  { name: 'Technology', icon: Code, description: 'Building and working with tech' },
  { name: 'Design', icon: Star, description: 'Creating beautiful interfaces' },
  { name: 'Data & Analytics', icon: Target, description: 'Finding insights in data' },
  { name: 'Marketing', icon: Globe, description: 'Promoting products and brands' },
  { name: 'Leadership', icon: Users, description: 'Managing teams and projects' },
  { name: 'Innovation', icon: Zap, description: 'Creating new solutions' },
  { name: 'Problem Solving', icon: Brain, description: 'Tackling complex challenges' },
  { name: 'Creativity', icon: Heart, description: 'Expressing artistic ideas' },
  { name: 'Business Strategy', icon: Briefcase, description: 'Planning business growth' },
  { name: 'Education', icon: GraduationCap, description: 'Teaching and learning' }
];

const PERSONALITY_TRAITS = [
  { name: 'Analytical', description: 'I love breaking down complex problems' },
  { name: 'Creative', description: 'I enjoy thinking outside the box' },
  { name: 'Detail-oriented', description: 'I focus on precision and accuracy' },
  { name: 'Collaborative', description: 'I work best in team environments' },
  { name: 'Independent', description: 'I prefer working autonomously' },
  { name: 'Empathetic', description: 'I understand others\' perspectives well' },
  { name: 'Curious', description: 'I love learning new things' },
  { name: 'Competitive', description: 'I thrive in challenging environments' },
  { name: 'Patient', description: 'I can work through long-term projects' },
  { name: 'Adaptable', description: 'I adjust well to change' }
];

const WORK_VALUES = [
  { name: 'Work-Life Balance', icon: Clock },
  { name: 'High Salary', icon: DollarSign },
  { name: 'Job Security', icon: CheckCircle },
  { name: 'Career Growth', icon: ArrowRight },
  { name: 'Creativity', icon: Star },
  { name: 'Team Collaboration', icon: Users },
  { name: 'Autonomy', icon: User },
  { name: 'Social Impact', icon: Heart },
  { name: 'Innovation', icon: Zap },
  { name: 'Recognition', icon: Target }
];

const AdvancedOnboarding = () => {  // REMOVE onComplete prop
  const { updateUser } = useAuth();  // ADD THIS
  const navigate = useNavigate();   // ADD THIS
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    skills: [],
    interests: [],
    personality: [],
    workValues: [],
    careerGoals: [],
    preferences: {}
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const updateUserData = (stepData) => {
    setUserData(prev => ({ ...prev, ...stepData }));
  };

const submitProfile = async () => {
  try {
    const token = localStorage.getItem('trailblix_token');
    const response = await fetch('/api/users/profile', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (response.ok) {
      const result = await response.json();
      updateUser(result.user);     // CHANGE TO THIS
      navigate('/dashboard');      // ADD THIS LINE
    }
  } catch (error) {
    console.error('Profile submission failed:', error);
  }
};

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;
  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <div className={styles.onboardingContainer}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Counter */}
      <div className={styles.stepCounter}>
        Step {currentStep + 1} of {ONBOARDING_STEPS.length}
      </div>

      {/* Main Content */}
      <div 
        className={`${styles.stepContent} ${isAnimating ? styles.animating : ''}`}
      >
        {renderStep(currentStepData, userData, updateUserData, nextStep, prevStep, submitProfile)}
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        {currentStep > 0 && (
          <button 
            onClick={prevStep} 
            className={styles.backButton}
            disabled={isAnimating}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
        
        <div className={styles.stepDots}>
          {ONBOARDING_STEPS.map((_, index) => (
            <div 
              key={index}
              className={`${styles.dot} ${index <= currentStep ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Welcome Step Component
const WelcomeStep = ({ onNext }) => (
  <div className={styles.welcomeStep}>
    <div className={styles.welcomeIcon}>
      <Zap size={48} />
    </div>
    <h1>Welcome to Trailblix</h1>
    <p className={styles.subtitle}>
      Discover your perfect career path with AI-powered insights. 
      This personalized assessment takes about 5 minutes.
    </p>
    <div className={styles.features}>
      <div className={styles.feature}>
        <Brain size={20} />
        <span>AI-powered matching</span>
      </div>
      <div className={styles.feature}>
        <Target size={20} />
        <span>Personalized recommendations</span>
      </div>
      <div className={styles.feature}>
        <GraduationCap size={20} />
        <span>Learning path guidance</span>
      </div>
    </div>
    <button onClick={onNext} className={styles.primaryButton}>
      Let's Get Started
      <ArrowRight size={16} />
    </button>
  </div>
);

// Basic Info Step Component
const BasicInfoStep = ({ userData, updateData, onNext }) => {
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    currentRole: userData.currentRole || '',
    yearsOfExperience: userData.yearsOfExperience || 0,
    education: userData.education || { level: '', field: '' }
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateData(formData);
      onNext();
    }
  };

  return (
    <div className={styles.basicInfoStep}>
      <div className={styles.stepHeader}>
        <User size={32} />
        <h2>Tell us about yourself</h2>
        <p>Let's start with the basics to personalize your experience</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>
            <User size={16} />
            Full Name
          </label>
          <input 
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={errors.name ? styles.error : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>
            <Mail size={16} />
            Email Address
          </label>
          <input 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={errors.email ? styles.error : ''}
            placeholder="your.email@example.com"
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>
            <Briefcase size={16} />
            Current Role (Optional)
          </label>
          <input 
            type="text"
            value={formData.currentRole}
            onChange={(e) => setFormData({...formData, currentRole: e.target.value})}
            placeholder="e.g., Student, Marketing Assistant, Software Developer"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>
            <Clock size={16} />
            Years of Professional Experience
          </label>
          <select 
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData({...formData, yearsOfExperience: parseInt(e.target.value)})}
          >
            <option value={0}>No professional experience</option>
            <option value={1}>Less than 1 year</option>
            <option value={2}>1-3 years</option>
            <option value={5}>3-5 years</option>
            <option value={8}>5-10 years</option>
            <option value={15}>10+ years</option>
          </select>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>
              <GraduationCap size={16} />
              Education Level
            </label>
            <select 
              value={formData.education.level}
              onChange={(e) => setFormData({
                ...formData, 
                education: {...formData.education, level: e.target.value}
              })}
            >
              <option value="">Select education level</option>
              <option value="high-school">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="bootcamp">Bootcamp</option>
              <option value="self-taught">Self-Taught</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Field of Study (Optional)</label>
            <input 
              type="text"
              value={formData.education.field}
              onChange={(e) => setFormData({
                ...formData, 
                education: {...formData.education, field: e.target.value}
              })}
              placeholder="e.g., Computer Science, Marketing"
            />
          </div>
        </div>

        <button type="submit" className={styles.primaryButton}>
          Continue
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};

// Skills Assessment Step
const SkillsStep = ({ userData, updateData, onNext }) => {
  const [selectedSkills, setSelectedSkills] = useState(userData.skills || []);
  const [skillLevels, setSkillLevels] = useState({});

  const toggleSkill = (skill) => {
    if (selectedSkills.find(s => s.name === skill.name)) {
      setSelectedSkills(prev => prev.filter(s => s.name !== skill.name));
      const newLevels = { ...skillLevels };
      delete newLevels[skill.name];
      setSkillLevels(newLevels);
    } else {
      setSelectedSkills(prev => [...prev, { name: skill.name, level: 'intermediate' }]);
      setSkillLevels(prev => ({ ...prev, [skill.name]: 'intermediate' }));
    }
  };

  const updateSkillLevel = (skillName, level) => {
    setSkillLevels(prev => ({ ...prev, [skillName]: level }));
    setSelectedSkills(prev => 
      prev.map(skill => 
        skill.name === skillName ? { ...skill, level } : skill
      )
    );
  };

  const handleContinue = () => {
    updateData({ skills: selectedSkills });
    onNext();
  };

  const groupedSkills = SKILLS_OPTIONS.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className={styles.skillsStep}>
      <div className={styles.stepHeader}>
        <Code size={32} />
        <h2>What are your skills?</h2>
        <p>Select all skills you have experience with and rate your proficiency</p>
      </div>

      <div className={styles.skillsGrid}>
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className={styles.skillCategory}>
            <h3>{category}</h3>
            <div className={styles.skillsInCategory}>
              {skills.map((skill) => {
                const isSelected = selectedSkills.find(s => s.name === skill.name);
                const IconComponent = skill.icon;
                
                return (
                  <div key={skill.name} className={styles.skillCard}>
                    <div 
                      className={`${styles.skillSelector} ${isSelected ? styles.selected : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      <IconComponent size={20} />
                      <span>{skill.name}</span>
                      {isSelected && <CheckCircle size={16} />}
                    </div>
                    
                    {isSelected && (
                      <div className={styles.levelSelector}>
                        {['beginner', 'intermediate', 'advanced'].map(level => (
                          <button
                            key={level}
                            type="button"
                            className={`${styles.levelButton} ${
                              skillLevels[skill.name] === level ? styles.active : ''
                            }`}
                            onClick={() => updateSkillLevel(skill.name, level)}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.selectedCount}>
        {selectedSkills.length} skills selected
      </div>

      <button 
        onClick={handleContinue} 
        className={styles.primaryButton}
        disabled={selectedSkills.length === 0}
      >
        Continue
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Interests Step
const InterestsStep = ({ userData, updateData, onNext }) => {
  const [selectedInterests, setSelectedInterests] = useState(userData.interests || []);

  const toggleInterest = (interestName) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests(prev => prev.filter(i => i !== interestName));
    } else if (selectedInterests.length < 6) {
      setSelectedInterests(prev => [...prev, interestName]);
    }
  };

  const handleContinue = () => {
    updateData({ interests: selectedInterests });
    onNext();
  };

  return (
    <div className={styles.interestsStep}>
      <div className={styles.stepHeader}>
        <Heart size={32} />
        <h2>What drives you?</h2>
        <p>Select up to 6 areas that genuinely interest you</p>
      </div>

      <div className={styles.interestsGrid}>
        {INTERESTS_OPTIONS.map((interest) => {
          const isSelected = selectedInterests.includes(interest.name);
          const IconComponent = interest.icon;
          
          return (
            <div 
              key={interest.name}
              className={`${styles.interestCard} ${isSelected ? styles.selected : ''} ${
                selectedInterests.length >= 6 && !isSelected ? styles.disabled : ''
              }`}
              onClick={() => toggleInterest(interest.name)}
            >
              <IconComponent size={24} />
              <h3>{interest.name}</h3>
              <p>{interest.description}</p>
              {isSelected && <CheckCircle className={styles.checkIcon} size={20} />}
            </div>
          );
        })}
      </div>

      <div className={styles.selectionInfo}>
        {selectedInterests.length}/6 interests selected
      </div>

      <button 
        onClick={handleContinue} 
        className={styles.primaryButton}
        disabled={selectedInterests.length === 0}
      >
        Continue
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Personality Step
const PersonalityStep = ({ userData, updateData, onNext }) => {
  const [selectedTraits, setSelectedTraits] = useState(userData.personality || []);

  const toggleTrait = (traitName) => {
    if (selectedTraits.includes(traitName)) {
      setSelectedTraits(prev => prev.filter(t => t !== traitName));
    } else if (selectedTraits.length < 5) {
      setSelectedTraits(prev => [...prev, traitName]);
    }
  };

  const handleContinue = () => {
    updateData({ personality: selectedTraits });
    onNext();
  };

  return (
    <div className={styles.personalityStep}>
      <div className={styles.stepHeader}>
        <Brain size={32} />
        <h2>How would you describe yourself?</h2>
        <p>Choose up to 5 personality traits that best describe you</p>
      </div>

      <div className={styles.traitsGrid}>
        {PERSONALITY_TRAITS.map((trait) => {
          const isSelected = selectedTraits.includes(trait.name);
          
          return (
            <div 
              key={trait.name}
              className={`${styles.traitCard} ${isSelected ? styles.selected : ''} ${
                selectedTraits.length >= 5 && !isSelected ? styles.disabled : ''
              }`}
              onClick={() => toggleTrait(trait.name)}
            >
              <h3>{trait.name}</h3>
              <p>{trait.description}</p>
              {isSelected && <CheckCircle className={styles.checkIcon} size={20} />}
            </div>
          );
        })}
      </div>

      <div className={styles.selectionInfo}>
        {selectedTraits.length}/5 traits selected
      </div>

      <button 
        onClick={handleContinue} 
        className={styles.primaryButton}
        disabled={selectedTraits.length === 0}
      >
        Continue
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Goals Step
const GoalsStep = ({ userData, updateData, onNext }) => {
  const [goals, setGoals] = useState(userData.careerGoals || []);
  const [newGoal, setNewGoal] = useState({ title: '', timeframe: '1-2 years', priority: 'medium' });

  const addGoal = () => {
    if (newGoal.title.trim() && goals.length < 3) {
      setGoals(prev => [...prev, { ...newGoal, id: Date.now() }]);
      setNewGoal({ title: '', timeframe: '1-2 years', priority: 'medium' });
    }
  };

  const removeGoal = (goalId) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const handleContinue = () => {
    updateData({ careerGoals: goals });
    onNext();
  };

  return (
    <div className={styles.goalsStep}>
      <div className={styles.stepHeader}>
        <Target size={32} />
        <h2>What are your career goals?</h2>
        <p>Add up to 3 career aspirations with timelines</p>
      </div>

      <div className={styles.goalForm}>
        <div className={styles.inputGroup}>
          <input 
            type="text"
            placeholder="e.g., Become a Senior Software Developer"
            value={newGoal.title}
            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          />
        </div>
        
        <div className={styles.goalOptions}>
          <select 
            value={newGoal.timeframe}
            onChange={(e) => setNewGoal({...newGoal, timeframe: e.target.value})}
          >
            <option value="6 months">6 months</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
          
          <select 
            value={newGoal.priority}
            onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <button 
            type="button"
            onClick={addGoal}
            className={styles.addButton}
            disabled={!newGoal.title.trim() || goals.length >= 3}
          >
            Add Goal
          </button>
        </div>
      </div>

      <div className={styles.goalsList}>
        {goals.map((goal) => (
          <div key={goal.id} className={styles.goalItem}>
            <div className={styles.goalContent}>
              <h4>{goal.title}</h4>
              <div className={styles.goalMeta}>
                <span className={styles.timeframe}>{goal.timeframe}</span>
                <span className={`${styles.priority} ${styles[goal.priority]}`}>
                  {goal.priority} priority
                </span>
              </div>
            </div>
            <button 
              onClick={() => removeGoal(goal.id)}
              className={styles.removeButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={handleContinue} 
        className={styles.primaryButton}
        disabled={goals.length === 0}
      >
        Continue
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Preferences Step
const PreferencesStep = ({ userData, updateData, onNext }) => {
  const [preferences, setPreferences] = useState(userData.preferences || {
    workEnvironment: '',
    industries: [],
    salaryRange: { min: 30000, max: 100000 },
    workValues: []
  });

  const toggleIndustry = (industry) => {
    const industries = preferences.industries || [];
    if (industries.includes(industry)) {
      setPreferences(prev => ({
        ...prev,
        industries: industries.filter(i => i !== industry)
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        industries: [...industries, industry]
      }));
    }
  };

  const toggleWorkValue = (value) => {
    const workValues = preferences.workValues || [];
    if (workValues.includes(value)) {
      setPreferences(prev => ({
        ...prev,
        workValues: workValues.filter(v => v !== value)
      }));
    } else if (workValues.length < 5) {
      setPreferences(prev => ({
        ...prev,
        workValues: [...workValues, value]
      }));
    }
  };

  const handleContinue = () => {
    updateData({ preferences });
    onNext();
  };

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design', 'Consulting', 'Non-profit'];

  return (
    <div className={styles.preferencesStep}>
      <div className={styles.stepHeader}>
        <MapPin size={32} />
        <h2>Work Preferences</h2>
        <p>Tell us about your ideal work environment and values</p>
      </div>

      <div className={styles.preferencesForm}>
        <div className={styles.preferenceSection}>
          <h3>
            <Building size={20} />
            Work Environment
          </h3>
          <div className={styles.environmentOptions}>
            {[
              { value: 'remote', label: 'Remote', icon: Home },
              { value: 'hybrid', label: 'Hybrid', icon: Coffee },
              { value: 'office', label: 'Office', icon: Building }
            ].map(option => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.environmentButton} ${
                    preferences.workEnvironment === option.value ? styles.selected : ''
                  }`}
                  onClick={() => setPreferences(prev => ({
                    ...prev,
                    workEnvironment: option.value
                  }))}
                >
                  <IconComponent size={20} />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.preferenceSection}>
          <h3>
            <Briefcase size={20} />
            Industries of Interest
          </h3>
          <div className={styles.industriesGrid}>
            {industries.map(industry => (
              <button
                key={industry}
                type="button"
                className={`${styles.industryButton} ${
                  preferences.industries?.includes(industry) ? styles.selected : ''
                }`}
                onClick={() => toggleIndustry(industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.preferenceSection}>
          <h3>
            <DollarSign size={20} />
            Desired Salary Range
          </h3>
          <div className={styles.salaryRange}>
            <div className={styles.salaryInput}>
              <label>Minimum</label>
              <input 
                type="number"
                value={preferences.salaryRange?.min || 30000}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  salaryRange: {
                    ...prev.salaryRange,
                    min: parseInt(e.target.value)
                  }
                }))}
                step="5000"
                min="0"
              />
            </div>
            <div className={styles.salaryInput}>
              <label>Maximum</label>
              <input 
                type="number"
                value={preferences.salaryRange?.max || 100000}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  salaryRange: {
                    ...prev.salaryRange,
                    max: parseInt(e.target.value)
                  }
                }))}
                step="5000"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className={styles.preferenceSection}>
          <h3>
            <Heart size={20} />
            Work Values (Select up to 5)
          </h3>
          <div className={styles.valuesGrid}>
            {WORK_VALUES.map(value => {
             const IconComponent = value.icon;
             const isSelected = preferences.workValues?.includes(value.name);
             
             return (
               <button
                 key={value.name}
                 type="button"
                 className={`${styles.valueButton} ${isSelected ? styles.selected : ''} ${
                   (preferences.workValues?.length >= 5 && !isSelected) ? styles.disabled : ''
                 }`}
                 onClick={() => toggleWorkValue(value.name)}
                 disabled={preferences.workValues?.length >= 5 && !isSelected}
               >
                 <IconComponent size={16} />
                 {value.name}
               </button>
             );
           })}
         </div>
       </div>
     </div>

     <button 
       onClick={handleContinue} 
       className={styles.primaryButton}
       disabled={!preferences.workEnvironment}
     >
       Continue
       <ArrowRight size={16} />
     </button>
   </div>
 );
};

// Completion Step
const CompletionStep = ({ userData, onSubmit }) => {
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async () => {
   setIsSubmitting(true);
   await onSubmit();
   setIsSubmitting(false);
 };

 const completionStats = {
   skills: userData.skills?.length || 0,
   interests: userData.interests?.length || 0,
   goals: userData.careerGoals?.length || 0,
   traits: userData.personality?.length || 0
 };

 return (
   <div className={styles.completionStep}>
     <div className={styles.completionIcon}>
       <CheckCircle size={64} />
     </div>
     
     <h1>Profile Complete!</h1>
     <p className={styles.completionSubtitle}>
       Great job! Your AI-powered career profile is ready. Here's what we've captured:
     </p>

     <div className={styles.profileSummary}>
       <div className={styles.summaryCard}>
         <Code size={24} />
         <div>
           <h3>{completionStats.skills}</h3>
           <p>Skills Assessed</p>
         </div>
       </div>
       
       <div className={styles.summaryCard}>
         <Heart size={24} />
         <div>
           <h3>{completionStats.interests}</h3>
           <p>Interests Identified</p>
         </div>
       </div>
       
       <div className={styles.summaryCard}>
         <Target size={24} />
         <div>
           <h3>{completionStats.goals}</h3>
           <p>Career Goals</p>
         </div>
       </div>
       
       <div className={styles.summaryCard}>
         <Brain size={24} />
         <div>
           <h3>{completionStats.traits}</h3>
           <p>Personality Traits</p>
         </div>
       </div>
     </div>

     <div className={styles.nextSteps}>
       <h3>What happens next?</h3>
       <ul>
         <li>
           <Zap size={16} />
           AI analyzes your profile for career matches
         </li>
         <li>
           <Target size={16} />
           Personalized learning paths are generated
         </li>
         <li>
           <Briefcase size={16} />
           Job recommendations based on your goals
         </li>
         <li>
           <GraduationCap size={16} />
           Progress tracking for skill development
         </li>
       </ul>
     </div>

     <button 
       onClick={handleSubmit} 
       className={styles.primaryButton}
       disabled={isSubmitting}
     >
       {isSubmitting ? (
         <>
           <div className={styles.spinner}></div>
           Creating Your Dashboard...
         </>
       ) : (
         <>
           View My Career Dashboard
           <ArrowRight size={16} />
         </>
       )}
     </button>
   </div>
 );
};

// Main render function for steps
const renderStep = (stepData, userData, updateData, onNext, onPrev, onSubmit) => {
 const stepProps = {
   userData,
   updateData,
   onNext,
   onPrev,
   onSubmit
 };

 switch (stepData.component) {
   case 'WelcomeStep':
     return <WelcomeStep {...stepProps} />;
   case 'BasicInfoStep':
     return <BasicInfoStep {...stepProps} />;
   case 'SkillsStep':
     return <SkillsStep {...stepProps} />;
   case 'InterestsStep':
     return <InterestsStep {...stepProps} />;
   case 'PersonalityStep':
     return <PersonalityStep {...stepProps} />;
   case 'GoalsStep':
     return <GoalsStep {...stepProps} />;
   case 'PreferencesStep':
     return <PreferencesStep {...stepProps} />;
   case 'CompletionStep':
     return <CompletionStep {...stepProps} />;
   default:
     return <div>Step not implemented</div>;
 }
};

export default AdvancedOnboarding;