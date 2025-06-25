// server/ai/advancedCareerEngine.js
const CAREER_DATABASE = [
  {
    id: 'software_dev',
    title: 'Software Developer',
    category: 'Technology',
    subCategories: ['Frontend', 'Backend', 'Full-Stack', 'Mobile'],
    levels: {
      entry: { experience: '0-2', salary: [50000, 80000], requirements: 0.6 },
      mid: { experience: '2-5', salary: [80000, 120000], requirements: 0.75 },
      senior: { experience: '5+', salary: [120000, 200000], requirements: 0.9 }
    },
    skills: {
      core: {
        'JavaScript': { weight: 0.9, category: 'programming', alternatives: ['TypeScript'] },
        'React': { weight: 0.8, category: 'frontend', alternatives: ['Vue', 'Angular'] },
        'Node.js': { weight: 0.7, category: 'backend', alternatives: ['Python', 'Java'] },
        'Git': { weight: 0.6, category: 'tools', alternatives: ['Version Control'] }
      },
      bonus: ['Docker', 'AWS', 'GraphQL', 'Testing', 'CI/CD'],
      soft: ['Problem Solving', 'Communication', 'Team Collaboration', 'Attention to Detail']
    },
    interests: ['technology', 'problem-solving', 'innovation', 'automation', 'building'],
    personality: {
      required: ['analytical', 'detail-oriented'],
      preferred: ['creative', 'independent', 'curious', 'patient']
    },
    workEnvironment: ['remote', 'hybrid', 'office'],
    industries: ['tech', 'fintech', 'healthcare', 'e-commerce', 'gaming'],
    growthTrajectory: ['Senior Developer', 'Tech Lead', 'Engineering Manager', 'CTO'],
    marketData: {
      demand: 95,
      competition: 75,
      futureOutlook: 'excellent',
      automationRisk: 'low',
      jobGrowth: 22
    },
    workValues: ['creativity', 'innovation', 'autonomy', 'career-growth'],
    learningPath: {
      beginner: ['HTML/CSS', 'JavaScript Fundamentals', 'Version Control'],
      intermediate: ['React/Framework', 'Backend Development', 'Databases'],
      advanced: ['System Design', 'Cloud Architecture', 'Leadership']
    }
  },
  {
    id: 'ux_designer',
    title: 'UX Designer',
    category: 'Design',
    subCategories: ['Product Design', 'Research', 'Visual Design', 'Interaction Design'],
    levels: {
      entry: { experience: '0-2', salary: [45000, 70000], requirements: 0.6 },
      mid: { experience: '2-5', salary: [70000, 110000], requirements: 0.75 },
      senior: { experience: '5+', salary: [110000, 160000], requirements: 0.9 }
    },
    skills: {
      core: {
        'Figma': { weight: 0.9, category: 'design-tools', alternatives: ['Sketch', 'Adobe XD'] },
        'User Research': { weight: 0.8, category: 'research', alternatives: ['Usability Testing'] },
        'Prototyping': { weight: 0.7, category: 'design', alternatives: ['Wireframing'] },
        'Design': { weight: 0.8, category: 'creative', alternatives: ['Visual Design'] }
      },
      bonus: ['HTML/CSS', 'Design Systems', 'A/B Testing', 'Analytics'],
      soft: ['Empathy', 'Communication', 'Critical Thinking', 'Collaboration']
    },
    interests: ['design', 'psychology', 'user-experience', 'visual-arts', 'creativity'],
    personality: {
      required: ['empathetic', 'creative'],
      preferred: ['detail-oriented', 'collaborative', 'curious', 'patient']
    },
    workEnvironment: ['hybrid', 'office', 'remote'],
    industries: ['tech', 'digital-agencies', 'consulting', 'healthcare', 'finance'],
    growthTrajectory: ['Senior UX Designer', 'Lead Designer', 'Design Manager', 'VP Design'],
    marketData: {
      demand: 85,
      competition: 80,
      futureOutlook: 'good',
      automationRisk: 'low',
      jobGrowth: 13
    },
    workValues: ['creativity', 'social-impact', 'team-collaboration', 'innovation'],
    learningPath: {
      beginner: ['Design Principles', 'Figma Basics', 'User Research Methods'],
      intermediate: ['Advanced Prototyping', 'Design Systems', 'Usability Testing'],
      advanced: ['Strategic Design', 'Team Leadership', 'Business Strategy']
    }
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    category: 'Analytics',
    subCategories: ['Machine Learning', 'Analytics', 'Research', 'AI'],
    levels: {
      entry: { experience: '0-2', salary: [70000, 95000], requirements: 0.7 },
      mid: { experience: '2-5', salary: [95000, 140000], requirements: 0.8 },
      senior: { experience: '5+', salary: [140000, 220000], requirements: 0.9 }
    },
    skills: {
      core: {
        'Python': { weight: 0.9, category: 'programming', alternatives: ['R'] },
        'SQL': { weight: 0.8, category: 'database', alternatives: ['NoSQL'] },
        'Data Analysis': { weight: 0.9, category: 'analytics', alternatives: ['Statistics'] },
        'Machine Learning': { weight: 0.7, category: 'ai', alternatives: ['Deep Learning'] }
      },
      bonus: ['TensorFlow', 'PyTorch', 'Tableau', 'Excel', 'Cloud Platforms'],
      soft: ['Critical Thinking', 'Problem Solving', 'Communication', 'Curiosity']
    },
    interests: ['data', 'patterns', 'insights', 'problem-solving', 'innovation'],
    personality: {
      required: ['analytical', 'curious'],
      preferred: ['detail-oriented', 'patient', 'independent', 'logical-thinking']
    },
    workEnvironment: ['remote', 'hybrid', 'office'],
    industries: ['tech', 'finance', 'healthcare', 'consulting', 'research'],
    growthTrajectory: ['Senior Data Scientist', 'Lead Data Scientist', 'Data Science Manager', 'Chief Data Officer'],
    marketData: {
      demand: 90,
      competition: 85,
      futureOutlook: 'excellent',
      automationRisk: 'medium',
      jobGrowth: 35
    },
    workValues: ['innovation', 'autonomy', 'high-salary', 'career-growth'],
    learningPath: {
      beginner: ['Python/R Basics', 'Statistics', 'SQL'],
      intermediate: ['Machine Learning', 'Data Visualization', 'Cloud Platforms'],
      advanced: ['Deep Learning', 'MLOps', 'Leadership']
    }
  },
  {
    id: 'digital_marketer',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    subCategories: ['Content Marketing', 'SEO', 'Social Media', 'PPC'],
    levels: {
      entry: { experience: '0-2', salary: [40000, 60000], requirements: 0.5 },
      mid: { experience: '2-5', salary: [60000, 90000], requirements: 0.7 },
      senior: { experience: '5+', salary: [90000, 130000], requirements: 0.85 }
    },
    skills: {
      core: {
        'SEO': { weight: 0.8, category: 'marketing', alternatives: ['SEM'] },
        'Content Marketing': { weight: 0.8, category: 'content', alternatives: ['Content Creation'] },
        'Google Ads': { weight: 0.7, category: 'advertising', alternatives: ['Facebook Ads', 'PPC'] },
        'Analytics': { weight: 0.7, category: 'data', alternatives: ['Google Analytics'] }
      },
      bonus: ['Social Media', 'Email Marketing', 'CRM', 'A/B Testing'],
      soft: ['Communication', 'Creativity', 'Strategic Thinking', 'Adaptability']
    },
    interests: ['marketing', 'growth', 'strategy', 'social-media', 'creativity'],
    personality: {
      required: ['creative', 'analytical'],
      preferred: ['communication', 'adaptable', 'competitive', 'detail-oriented']
    },
    workEnvironment: ['remote', 'hybrid', 'office'],
    industries: ['marketing', 'e-commerce', 'tech', 'retail', 'consulting'],
    growthTrajectory: ['Senior Marketing Specialist', 'Marketing Manager', 'Marketing Director', 'CMO'],
    marketData: {
      demand: 75,
      competition: 70,
      futureOutlook: 'good',
      automationRisk: 'medium',
      jobGrowth: 10
    },
    workValues: ['creativity', 'career-growth', 'recognition', 'team-collaboration'],
    learningPath: {
      beginner: ['Digital Marketing Basics', 'Google Analytics', 'Content Creation'],
      intermediate: ['Advanced SEO', 'Paid Advertising', 'Marketing Automation'],
      advanced: ['Marketing Strategy', 'Data Analysis', 'Team Leadership']
    }
  },
  {
    id: 'product_manager',
    title: 'Product Manager',
    category: 'Management',
    subCategories: ['Product Strategy', 'Technical PM', 'Growth PM', 'Data PM'],
    levels: {
      entry: { experience: '0-2', salary: [70000, 100000], requirements: 0.7 },
      mid: { experience: '2-5', salary: [100000, 150000], requirements: 0.8 },
      senior: { experience: '5+', salary: [150000, 250000], requirements: 0.9 }
    },
    skills: {
      core: {
        'Product Management': { weight: 0.9, category: 'management', alternatives: ['Project Management'] },
        'Data Analysis': { weight: 0.8, category: 'analytics', alternatives: ['Analytics'] },
        'User Research': { weight: 0.7, category: 'research', alternatives: ['Market Research'] },
        'Strategic Planning': { weight: 0.8, category: 'strategy', alternatives: ['Business Strategy'] }
      },
      bonus: ['Agile', 'SQL', 'Design Thinking', 'A/B Testing'],
      soft: ['Leadership', 'Communication', 'Strategic Thinking', 'Problem Solving']
    },
    interests: ['strategy', 'leadership', 'innovation', 'problem-solving', 'technology'],
    personality: {
      required: ['analytical', 'communication'],
      preferred: ['leadership', 'strategic-thinking', 'adaptable', 'collaborative']
    },
    workEnvironment: ['hybrid', 'office', 'remote'],
    industries: ['tech', 'fintech', 'healthcare', 'e-commerce', 'consulting'],
    growthTrajectory: ['Senior Product Manager', 'Principal PM', 'Director of Product', 'VP Product'],
    marketData: {
      demand: 80,
      competition: 85,
      futureOutlook: 'excellent',
      automationRisk: 'low',
      jobGrowth: 19
    },
    workValues: ['leadership', 'innovation', 'high-salary', 'career-growth'],
    learningPath: {
      beginner: ['Product Management Basics', 'Market Research', 'Analytics'],
      intermediate: ['Product Strategy', 'User Experience', 'Data Analysis'],
      advanced: ['Product Leadership', 'Business Strategy', 'Team Management']
    }
  }
];

// Advanced AI Matching Engine
class CareerMatchingEngine {
  constructor() {
    this.weightings = {
      skills: 0.35,
      interests: 0.25,
      personality: 0.20,
      workValues: 0.10,
      experience: 0.05,
      preferences: 0.05
    };
  }

  generateCareerMatches(userProfile) {
    console.log('🤖 AI Engine Processing Profile:', userProfile);
    
    const matches = [];
    
    for (const career of CAREER_DATABASE) {
      const analysis = this.calculateComprehensiveMatch(userProfile, career);
      
      if (analysis.totalScore >= 0.25) {
        matches.push({
          ...career,
          confidence: Math.round(analysis.totalScore * 100),
          matchScore: analysis.totalScore,
          breakdown: analysis.breakdown,
          strengths: analysis.strengths,
          challenges: analysis.challenges,
          skillGaps: analysis.skillGaps,
          nextSteps: analysis.nextSteps,
          timeToReadiness: analysis.timeToReadiness,
          salaryFit: analysis.salaryFit,
          marketInsights: analysis.marketInsights
        });
      }
    }

    const sortedMatches = matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .map((match, index) => ({
        ...match,
        rank: index + 1,
        tier: index < 3 ? 'top' : index < 6 ? 'good' : 'potential'
      }));

    console.log('✅ Generated', sortedMatches.length, 'career matches');
    return sortedMatches;
  }

  calculateComprehensiveMatch(user, career) {
    const skillsAnalysis = this.analyzeSkills(user.skills || [], career.skills);
    const interestsScore = this.calculateInterestAlignment(user.interests || [], career.interests);
    const personalityScore = this.assessPersonalityFit(user.personality || [], career.personality);
    const workValuesScore = this.evaluateWorkValues(user.workValues || [], career.workValues);
    const experienceScore = this.assessExperienceLevel(user.yearsOfExperience || 0, career.levels);
    const preferencesScore = this.matchPreferences(user.preferences || {}, career);

    const totalScore = (
      skillsAnalysis.score * this.weightings.skills +
      interestsScore * this.weightings.interests +
      personalityScore * this.weightings.personality +
      workValuesScore * this.weightings.workValues +
      experienceScore * this.weightings.experience +
      preferencesScore * this.weightings.preferences
    );

    return {
      totalScore,
      breakdown: {
        skills: skillsAnalysis.score,
        interests: interestsScore,
        personality: personalityScore,
        workValues: workValuesScore,
        experience: experienceScore,
        preferences: preferencesScore
      },
      strengths: this.identifyStrengths(user, career, {
        skills: skillsAnalysis.score,
        interests: interestsScore,
        personality: personalityScore,
        workValues: workValuesScore
      }),
      challenges: this.identifyChallenges(user, career, skillsAnalysis),
      skillGaps: skillsAnalysis.gaps,
      nextSteps: this.generateActionPlan(user, career, skillsAnalysis),
      timeToReadiness: this.estimateReadinessTime(skillsAnalysis.gaps, user.yearsOfExperience || 0),
      salaryFit: this.assessSalaryAlignment(user.preferences?.salaryRange, career.levels),
      marketInsights: this.generateMarketInsights(career)
    };
  }

  analyzeSkills(userSkills, careerSkills) {
    if (!userSkills || userSkills.length === 0) {
      return {
        score: 0,
        gaps: Object.keys(careerSkills.core).map(skill => ({
          skill,
          priority: 'high',
          category: careerSkills.core[skill].category,
          estimatedTime: this.estimateLearningTime(skill)
        }))
      };
    }

    const normalizedUserSkills = userSkills.map(skill => {
      if (typeof skill === 'object' && skill.name) {
        return {
          name: skill.name.toLowerCase().trim(),
          level: skill.level || 'intermediate'
        };
      }
      return {
        name: String(skill).toLowerCase().trim(),
        level: 'intermediate'
      };
    });

    let totalWeight = 0;
    let earnedScore = 0;
    const gaps = [];

    for (const [skillName, skillConfig] of Object.entries(careerSkills.core)) {
      totalWeight += skillConfig.weight;
      
      const userSkill = normalizedUserSkills.find(us => 
        us.name === skillName.toLowerCase() ||
        skillConfig.alternatives?.some(alt => us.name === alt.toLowerCase())
      );

      if (userSkill) {
        const levelMultiplier = this.getLevelMultiplier(userSkill.level);
        earnedScore += skillConfig.weight * levelMultiplier;
      } else {
        gaps.push({
          skill: skillName,
          priority: skillConfig.weight > 0.8 ? 'high' : skillConfig.weight > 0.6 ? 'medium' : 'low',
          category: skillConfig.category,
          estimatedTime: this.estimateLearningTime(skillName),
          weight: skillConfig.weight
        });
      }
    }

    const bonusSkills = normalizedUserSkills.filter(us =>
      careerSkills.bonus?.some(bonus => us.name === bonus.toLowerCase())
    );
    const bonusScore = Math.min(bonusSkills.length * 0.05, 0.15);

    const finalScore = Math.min((earnedScore / totalWeight) + bonusScore, 1);
    
    return {
      score: finalScore,
      gaps: gaps.sort((a, b) => b.weight - a.weight)
    };
  }

  getLevelMultiplier(level) {
    const multipliers = {
      'beginner': 0.6,
      'intermediate': 0.8,
      'advanced': 1.0
    };
    return multipliers[level] || 0.8;
  }

  calculateInterestAlignment(userInterests, careerInterests) {
    if (!userInterests || userInterests.length === 0) return 0.3;

    const normalizedUserInterests = userInterests.map(i => String(i).toLowerCase().trim());
    const matches = careerInterests.filter(interest => 
      normalizedUserInterests.includes(interest.toLowerCase())
    );
    
    const baseScore = matches.length / careerInterests.length;
    const abundanceBonus = Math.min((matches.length - 2) * 0.1, 0.2);
    
    return Math.min(baseScore + Math.max(abundanceBonus, 0), 1);
  }

  assessPersonalityFit(userPersonality, careerPersonality) {
    if (!userPersonality || userPersonality.length === 0) return 0.4;

    const normalizedUserPersonality = userPersonality.map(p => String(p).toLowerCase().trim());
    
    const requiredMatches = careerPersonality.required?.filter(trait => 
      normalizedUserPersonality.includes(trait.toLowerCase())
    ).length || 0;
    
    const requiredScore = careerPersonality.required ? 
      requiredMatches / careerPersonality.required.length : 0.8;
    
    const preferredMatches = careerPersonality.preferred?.filter(trait => 
      normalizedUserPersonality.includes(trait.toLowerCase())
    ).length || 0;
    
    const preferredBonus = careerPersonality.preferred ? 
      (preferredMatches / careerPersonality.preferred.length) * 0.2 : 0;
    
    return Math.min(requiredScore + preferredBonus, 1);
  }

  evaluateWorkValues(userWorkValues, careerWorkValues) {
    if (!userWorkValues || userWorkValues.length === 0) return 0.5;
    if (!careerWorkValues || careerWorkValues.length === 0) return 0.5;

    const normalizedUserValues = userWorkValues.map(v => String(v).toLowerCase().trim());
    const matches = careerWorkValues.filter(value => 
      normalizedUserValues.includes(value.toLowerCase())
    );
    
    return matches.length / Math.max(careerWorkValues.length, userWorkValues.length);
  }

  assessExperienceLevel(userExperience, careerLevels) {
    const experience = parseInt(userExperience) || 0;
    
    if (experience <= 2) return careerLevels.entry ? 0.9 : 0.6;
    if (experience <= 5) return careerLevels.mid ? 1.0 : 0.8;
    return careerLevels.senior ? 1.0 : 0.7;
  }

  matchPreferences(userPreferences, career) {
    let score = 0;
    let factors = 0;

    if (userPreferences.workEnvironment && career.workEnvironment) {
      factors++;
      if (career.workEnvironment.includes(userPreferences.workEnvironment)) {
        score += 1;
      }
    }

    if (userPreferences.industries && career.industries) {
      factors++;
      const hasIndustryMatch = userPreferences.industries.some(industry =>
        career.industries.includes(industry.toLowerCase())
      );
      if (hasIndustryMatch) score += 1;
    }

    return factors > 0 ? score / factors : 0.5;
  }

  identifyStrengths(user, career, scores) {
    const strengths = [];
    
    if (scores.skills >= 0.8) strengths.push("Excellent technical skill alignment");
    if (scores.interests >= 0.8) strengths.push("Strong passion alignment with field");
    if (scores.personality >= 0.8) strengths.push("Personality traits well-suited for role");
    if (scores.workValues >= 0.7) strengths.push("Work values align with career culture");
    
    if (user.yearsOfExperience >= 3) strengths.push("Solid professional experience foundation");
    if (user.skills && user.skills.length >= 5) strengths.push("Diverse skill portfolio");
    
    return strengths;
  }

  identifyChallenges(user, career, skillsAnalysis) {
    const challenges = [];
    
    if (skillsAnalysis.score < 0.4) challenges.push("Significant skill development needed");
    if (skillsAnalysis.gaps.filter(g => g.priority === 'high').length > 2) {
      challenges.push("Multiple critical skills to master");
    }
    
    const userExperience = parseInt(user.yearsOfExperience) || 0;
    if (userExperience === 0 && career.levels && !career.levels.entry) {
      challenges.push("Career typically requires some experience");
    }
    
    return challenges;
  }

  generateActionPlan(user, career, skillsAnalysis) {
    const steps = [];
    
    const highPriorityGaps = skillsAnalysis.gaps.filter(gap => gap.priority === 'high');
    if (highPriorityGaps.length > 0) {
      steps.push({
        type: 'skill_development',
        action: `Master ${highPriorityGaps[0].skill}`,
        priority: 'immediate',
        timeline: highPriorityGaps[0].estimatedTime,
        category: 'learning'
      });
    }

    const userExperience = parseInt(user.yearsOfExperience) || 0;
    if (userExperience < 2) {
      steps.push({
        type: 'experience',
        action: `Build portfolio projects in ${career.category.toLowerCase()}`,
        priority: 'high',
        timeline: '1-3 months',
        category: 'portfolio'
      });
    }

    steps.push({
      type: 'networking',
      action: `Connect with professionals in ${career.title}`,
      priority: 'medium',
      timeline: 'Ongoing',
      category: 'networking'
    });

    if (skillsAnalysis.gaps.length > 2) {
      steps.push({
        type: 'certification',
        action: `Consider ${career.category} certification or bootcamp`,
        priority: 'medium',
        timeline: '3-6 months',
        category: 'education'
      });
    }

    return steps.slice(0, 4);
  }

  estimateReadinessTime(skillGaps, userExperience) {
    const highPriorityGaps = skillGaps.filter(gap => gap.priority === 'high').length;
    const mediumPriorityGaps = skillGaps.filter(gap => gap.priority === 'medium').length;
    
    let months = 0;
    months += highPriorityGaps * 3;
    months += mediumPriorityGaps * 2;
    
    if (userExperience === 0) months += 6;
    
    if (months <= 3) return "Ready now - 3 months";
    if (months <= 8) return "3-8 months";
    if (months <= 18) return "8-18 months";
    return "18+ months (long-term goal)";
  }

  assessSalaryAlignment(userSalaryRange, careerLevels) {
    if (!userSalaryRange || !userSalaryRange.min) return { fit: 'unknown', message: 'No salary preference provided' };
    
    const userMin = userSalaryRange.min;
    const userMax = userSalaryRange.max || userMin * 1.5;
    
    for (const [level, data] of Object.entries(careerLevels)) {
      const [careerMin, careerMax] = data.salary;
      
      if (userMax >= careerMin && userMin <= careerMax) {
        return {
          fit: 'good',
          level,
          message: `Salary expectations align with ${level} level (${careerMin.toLocaleString()}-${careerMax.toLocaleString()})`
        };
      }
    }
    
    const highestLevel = Object.values(careerLevels).reduce((max, level) => 
      level.salary[1] > max.salary[1] ? level : max
    );
    
    if (userMin > highestLevel.salary[1]) {
      return {
        fit: 'high',
        message: `Expectations above typical range. Consider senior/leadership positions.`
      };
    }
    
    return {
      fit: 'low',
      message: `Consider entry-level positions or skill development to reach target salary.`
    };
  }

  generateMarketInsights(career) {
    return {
      demandLevel: this.getDemandDescription(career.marketData.demand),
      competitionLevel: this.getCompetitionDescription(career.marketData.competition),
      futureOutlook: career.marketData.futureOutlook,
      automationRisk: career.marketData.automationRisk,
      jobGrowth: `${career.marketData.jobGrowth}% projected growth`,
      keyIndustries: career.industries.slice(0, 3)
    };
  }

  getDemandDescription(demand) {
    if (demand >= 90) return "Very High Demand";
    if (demand >= 75) return "High Demand";
    if (demand >= 60) return "Moderate Demand";
    return "Lower Demand";
  }

  getCompetitionDescription(competition) {
    if (competition >= 85) return "Very Competitive";
    if (competition >= 70) return "Competitive";
    if (competition >= 55) return "Moderately Competitive";
    return "Less Competitive";
  }

  estimateLearningTime(skill) {
    const timeMap = {
      'JavaScript': '3-6 months',
      'Python': '2-4 months',
      'React': '2-4 months',
      'Figma': '2-4 weeks',
      'SQL': '1-3 months',
      'SEO': '2-4 months',
      'User Research': '2-4 months',
      'Data Analysis': '3-6 months',
      'Product Management': '2-4 months',
      'Git': '2-4 weeks'
    };
    
    return timeMap[skill] || '2-4 months';
  }
}

// Create engine instance
const advancedCareerEngine = new CareerMatchingEngine();

// Backward compatibility function
export const suggestCareers = (skills = [], interests = []) => {
  try {
    console.log('🔄 Legacy suggestCareers called with:', { skills, interests });
    
    const userProfile = {
      skills: Array.isArray(skills) ? skills.map(skill => ({
        name: typeof skill === 'string' ? skill : skill.name || skill,
        level: typeof skill === 'object' && skill.level ? skill.level : 'intermediate'
      })) : [],
      interests: Array.isArray(interests) ? interests : [],
      personality: [],
      workValues: [],
      yearsOfExperience: 0,
      preferences: {}
    };
    
    const matches = advancedCareerEngine.generateCareerMatches(userProfile);
    
    const legacyFormat = matches.map(match => ({
      title: match.title,
      confidence: match.confidence,
      category: match.category,
      salaryRange: match.salaryRange,
      marketDemand: match.marketData?.demandLevel || 'Unknown',
      skillGaps: match.skillGaps?.length || 0,
      timeToReadiness: match.timeToReadiness
    }));
    
    console.log('✅ Returning', legacyFormat.length, 'matches in legacy format');
    return legacyFormat;
    
  } catch (error) {
    console.error('❌ Error in suggestCareers:', error);
    return basicFallbackMatching(skills, interests);
  }
};

// Fallback function
function basicFallbackMatching(skills = [], interests = []) {
  console.log('⚠️ Using fallback matching');
  
  const basicCareers = [
    { title: 'Software Developer', confidence: 70, category: 'Technology' },
    { title: 'UX Designer', confidence: 60, category: 'Design' },
    { title: 'Data Analyst', confidence: 65, category: 'Analytics' }
  ];
  
  return basicCareers.slice(0, 3);
}

// Single export
export { advancedCareerEngine };