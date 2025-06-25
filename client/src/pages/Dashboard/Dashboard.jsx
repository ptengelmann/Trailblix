// pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { 
  User, 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Award, 
  BookOpen, 
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Star,
  Briefcase,
  BarChart3,
  MapPin,
  Users,
  Zap,
  ArrowUp,
  Calendar,
  PieChart,
  LogOut,
  Settings,
  Bell,
  FileText,
  RefreshCw,
  Heart
} from 'lucide-react';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  // Auth context for user data and logout functionality
  const { user: authUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [dashboardData, setDashboardData] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out. Please try again.');
    }
  };
  
  // Refresh dashboard data
  const refreshData = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    try {
      await fetchDashboardData();
      await fetchCareerSuggestions();
    } catch (error) {
      console.error('Refresh failed:', error);
      setError('Unable to refresh data. Please try again later.');
    } finally {
      setRefreshing(false);
    }
  };
  
  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('trailblix_token');
      
      const response = await fetch('/api/users/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Dashboard data fetch failed: ${response.status}`);
      }
      
      const data = await response.json();
      setDashboardData(data);
      
      // Update user data in auth context if needed
      if (data.profile_updated) {
        updateUser(data);
      }
      
      return data;
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      
      // If API call fails, fall back to auth context data
      if (authUser) {
        setDashboardData(authUser);
        return authUser;
      } else {
        setError('Failed to load dashboard data');
        throw error;
      }
    }
  };
  
  // Fetch career suggestions
  const fetchCareerSuggestions = async () => {
    try {
      const token = localStorage.getItem('trailblix_token');
      const userData = dashboardData || authUser;
      
      if (!userData) {
        throw new Error('No user data available for career suggestions');
      }
      
      const response = await fetch('/api/users/suggest', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          skills: userData.skills || [],
          interests: userData.interests || [],
          personality: userData.personality || [],
          workValues: userData.workValues || [],
          yearsOfExperience: userData.yearsOfExperience || 0,
          preferences: userData.preferences || {}
        })
      });
      
      if (!response.ok) {
        throw new Error(`Career suggestions fetch failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setCareers(data);
        if (data.length > 0) {
          setSelectedCareer(data[0]);
        }
      } else if (data.fallback && Array.isArray(data.fallback)) {
        setCareers(data.fallback);
        setError('Using fallback career recommendations');
      } else {
        setCareers([]);
        throw new Error('Invalid career data format received');
      }
    } catch (error) {
      console.error('Career suggestion error:', error);
      setError('Failed to load career suggestions');
      setCareers([]);
    }
  };
  
  // Fetch notifications
  const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem('trailblix_token');
    
    try {
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Notifications fetch failed: ${response.status}`);
      }
      
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      // Don't treat this as a critical error - just use empty notifications
      console.warn('Notifications fetch error:', error);
      setNotifications([]);
      // Don't set the error state for this non-critical feature
      // setError('Failed to load notifications');
    }
  } catch (error) {
    console.warn('Notifications processing error:', error);
    setNotifications([]);
  }
};
  
  // Initial data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        await fetchDashboardData();
        await fetchCareerSuggestions();
        await fetchNotifications();
      } catch (err) {
        console.error('Dashboard initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, [authUser]);
  
  // Helper functions
  const getConfidenceLevel = (confidence) => {
    if (confidence >= 80) return { level: 'excellent', color: '#10B981' };
    if (confidence >= 65) return { level: 'good', color: '#8A00FF' };
    if (confidence >= 50) return { level: 'moderate', color: '#F59E0B' };
    return { level: 'low', color: '#EF4444' };
  };
  
  const getSkillLevelIcon = (level) => {
    switch (level) {
      case 'advanced': return <Star className={styles.skillAdvanced} size={16} />;
      case 'intermediate': return <Target className={styles.skillIntermediate} size={16} />;
      default: return <BookOpen className={styles.skillBeginner} size={16} />;
    }
  };
  
  const getDemandIcon = (demand) => {
    if (typeof demand === 'string') {
      if (demand.includes('Very High') || demand.includes('Excellent')) {
        return <TrendingUp className={styles.demandHigh} size={16} />;
      }
      if (demand.includes('High') || demand.includes('Good')) {
        return <ArrowUp className={styles.demandMedium} size={16} />;
      }
    }
    return <BarChart3 className={styles.demandLow} size={16} />;
  };
  
  const toggleSkillsExpanded = () => {
    setSkillsExpanded(!skillsExpanded);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <Brain size={32} />
        </div>
        <p>Analyzing your career profile...</p>
        <div className={styles.loadingPulse}></div>
      </div>
    );
  }
  
  // Error state - only if critical
  if (error && !dashboardData && !authUser) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle size={48} />
        <h2>Unable to Load Profile</h2>
        <p>{error}</p>
        <button className={styles.errorButton} onClick={refreshData}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }
  
  // Get user data from dashboardData or fallback to authUser
  const userData = dashboardData || authUser || {};
  
  return (
    <div className={styles.dashboardContainer}>
      {/* Background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.noiseTexture}></div>
      </div>
      
      <div className={styles.dashboard}>
        {/* Top navigation */}
        <div className={styles.topNav}>
          <div className={styles.logo}>
            <Brain size={24} />
            <span>Trailblix</span>
          </div>
          
          <div className={styles.navActions}>
            <button className={styles.navButton}>
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className={styles.notificationBadge}>
                  {notifications.length}
                </span>
              )}
            </button>
            
            <button className={styles.navButton}>
              <Settings size={20} />
            </button>
            
            <button className={styles.logoutButton} onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Header section */}
        <div className={styles.header}>
          <div className={styles.welcomeSection}>
            <div className={styles.userAvatar}>
              <User size={24} />
            </div>
            <div className={styles.userInfo}>
              <h1>Welcome back, {userData.name || 'User'}</h1>
              <p>Your AI-powered career insights are ready</p>
            </div>
          </div>
          
          <div className={styles.profileStats}>
            <div className={styles.statCard}>
              <Target size={20} />
              <div>
                <span className={styles.statNumber}>
                  {careers.length || 0}
                </span>
                <span className={styles.statLabel}>Career Matches</span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <CheckCircle size={20} />
              <div>
                <span className={styles.statNumber}>
                  {userData.completionPercentage || 100}%
                </span>
                <span className={styles.statLabel}>Profile Complete</span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <BookOpen size={20} />
              <div>
                <span className={styles.statNumber}>
                  {Array.isArray(userData.skills) ? userData.skills.length : 0}
                </span>
                <span className={styles.statLabel}>Skills Assessed</span>
              </div>
            </div>
            
            <button 
              className={styles.refreshButton} 
              onClick={refreshData}
              disabled={refreshing}
            >
              <RefreshCw size={16} className={refreshing ? styles.spinning : ''} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
        
        {/* Error banner */}
        {error && (
          <div className={styles.errorBanner}>
            <AlertCircle size={16} />
            <span>{error}</span>
            <button className={styles.errorClose} onClick={() => setError(null)}>
              ×
            </button>
          </div>
        )}
        
        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            {/* Profile overview section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <User size={20} />
                <h2>Your Profile Overview</h2>
                <button className={styles.editButton}>
                  Edit Profile
                </button>
              </div>
              
              <div className={styles.profileGrid}>
                <div className={styles.profileItem}>
                  <Briefcase size={16} />
                  <div>
                    <span className={styles.profileLabel}>Current Role</span>
                    <span className={styles.profileValue}>
                      {userData.currentRole || 'Not specified'}
                    </span>
                  </div>
                </div>
                
                <div className={styles.profileItem}>
                  <Calendar size={16} />
                  <div>
                    <span className={styles.profileLabel}>Experience</span>
                    <span className={styles.profileValue}>
                      {userData.yearsOfExperience ? `${userData.yearsOfExperience} years` : 'Entry level'}
                    </span>
                  </div>
                </div>
                
                <div className={styles.profileItem}>
                  <Award size={16} />
                  <div>
                    <span className={styles.profileLabel}>Education</span>
                    <span className={styles.profileValue}>
                      {typeof userData.education === 'object' 
                        ? `${userData.education.level || 'Not specified'}${userData.education.field ? ` in ${userData.education.field}` : ''}`
                        : userData.education || 'Not provided'
                      }
                    </span>
                  </div>
                </div>
                
                <div className={styles.profileItem}>
                  <MapPin size={16} />
                  <div>
                    <span className={styles.profileLabel}>Work Preference</span>
                    <span className={styles.profileValue}>
                      {userData.preferences?.workEnvironment || 'Flexible'}
                    </span>
                  </div>
                </div>
              </div>
              
              {userData.skills && Array.isArray(userData.skills) && userData.skills.length > 0 && (
                <div className={styles.skillsSection}>
                  <div className={styles.skillsHeader}>
                    <h3>
                      <Zap size={16} />
                      Skills Portfolio
                    </h3>
                    <button 
                      className={styles.expandButton}
                      onClick={toggleSkillsExpanded}
                    >
                      {skillsExpanded ? 'Show Less' : 'Show All'}
                    </button>
                  </div>
                  
                  <div className={styles.skillsGrid}>
                    {userData.skills.slice(0, skillsExpanded ? userData.skills.length : 8).map((skill, index) => {
                      const skillName = typeof skill === 'object' ? skill.name : skill;
                      const skillLevel = typeof skill === 'object' ? skill.level : 'intermediate';
                      
                      return (
                        <div key={index} className={styles.skillTag}>
                          {getSkillLevelIcon(skillLevel)}
                          <span>{skillName}</span>
                        </div>
                      );
                    })}
                    {!skillsExpanded && userData.skills.length > 8 && (
                      <div 
                        className={`${styles.skillTag} ${styles.moreSkills}`}
                        onClick={toggleSkillsExpanded}
                      >
                        <span>+{userData.skills.length - 8} more</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {userData.interests && Array.isArray(userData.interests) && userData.interests.length > 0 && (
                <div className={styles.interestsSection}>
                  <h3>
                    <Heart size={16} />
                    Career Interests
                  </h3>
                  <div className={styles.interestTags}>
                    {userData.interests.map((interest, index) => (
                      <span key={index} className={styles.interestTag}>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Learning roadmap section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <BookOpen size={20} />
                <h2>Learning Roadmap</h2>
                {selectedCareer && (
                  <a href="#" className={styles.viewAllLink}>
                    View Full Plan
                  </a>
                )}
              </div>
              
              {selectedCareer && selectedCareer.nextSteps ? (
                <div className={styles.learningPlan}>
                  <div className={styles.learningHeader}>
                    <h3>Path to {selectedCareer.title}</h3>
                    <span className={styles.timeEstimate}>
                      <Clock size={14} />
                      {selectedCareer.timeToReadiness}
                    </span>
                  </div>
                  
                  <div className={styles.learningSteps}>
                    {selectedCareer.nextSteps.map((step, index) => (
                      <div key={index} className={styles.learningStep}>
                        <div className={styles.stepNumber}>{index + 1}</div>
                        <div className={styles.stepContent}>
                          <h4>{step.action}</h4>
                          <div className={styles.stepMeta}>
                            <span className={styles.stepCategory}>{step.category}</span>
                            <span className={styles.stepTimeline}>{step.timeline}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.emptyLearning}>
                  <Target size={32} />
                  <p>Select a career match to see your personalized learning path</p>
                </div>
              )}
            </div>
            
            {/* Additional resources section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FileText size={20} />
                <h2>Recommended Resources</h2>
              </div>
              
              <div className={styles.resourcesGrid}>
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className={styles.resourceCard}>
                    <div className={styles.resourceIcon}>
                      <BookOpen size={20} />
                    </div>
                    <div className={styles.resourceContent}>
                      <h4>
                        {index === 0 
                          ? "Mastering Technical Interviews" 
                          : index === 1 
                            ? "Career Transition Guide" 
                            : "Networking Strategies"}
                      </h4>
                      <p>
                        {index === 0 
                          ? "Practical tips for tech role interviews" 
                          : index === 1 
                            ? "How to pivot careers successfully" 
                            : "Building professional connections"}
                      </p>
                    </div>
                    <a href="#" className={styles.resourceLink}>
                      <ChevronRight size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.rightColumn}>
            {/* Career matches section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Brain size={20} />
                <h2>AI Career Matches</h2>
                <span className={styles.matchCount}>{careers.length} found</span>
              </div>
              
              {!Array.isArray(careers) || careers.length === 0 ? (
                <div className={styles.emptyCareers}>
                  <Target size={48} />
                  <h3>No matches found</h3>
                  <p>Complete your profile assessment to discover personalized career paths</p>
                </div>
              ) : (
                <div className={styles.careersContainer}>
                  {careers.map((career, index) => {
                    const confidence = getConfidenceLevel(career.confidence || 0);
                    const isSelected = selectedCareer?.id === career.id;
                    
                    return (
                      <div 
                        key={career.id || index} 
                        className={`${styles.careerCard} ${isSelected ? styles.selected : ''}`}
                        onClick={() => setSelectedCareer(career)}
                      >
                        <div className={styles.careerHeader}>
                          <div className={styles.careerTitle}>
                            <h3>{career.title}</h3>
                            {career.category && (
                              <span className={styles.careerCategory}>{career.category}</span>
                            )}
                          </div>
                          
                          <div 
                            className={styles.confidenceScore} 
                            style={{ color: confidence.color }}
                          >
                            <span className={styles.confidenceNumber}>
                              {career.confidence || 0}%
                            </span>
                            <span className={styles.confidenceLabel}>match</span>
                          </div>
                        </div>
                        
                        <div className={styles.careerMetrics}>
                          {career.salaryRange && (
                            <div className={styles.metric}>
                              <DollarSign size={14} />
                              <span>
                                ${career.salaryRange.min?.toLocaleString()} - ${career.salaryRange.max?.toLocaleString()}
                              </span>
                            </div>
                          )}
                          
                          {(career.marketData?.demandLevel || career.marketDemand) && (
                            <div className={styles.metric}>
                              {getDemandIcon(career.marketData?.demandLevel || career.marketDemand)}
                              <span>
                                {career.marketData?.demandLevel || career.marketDemand}
                              </span>
                            </div>
                          )}
                          
                          {career.timeToReadiness && (
                            <div className={styles.metric}>
                              <Clock size={14} />
                              <span>{career.timeToReadiness}</span>
                            </div>
                          )}
                        </div>
                        
                        {career.skillGaps && career.skillGaps.length > 0 && (
                          <div className={styles.skillGaps}>
                            <span className={styles.gapsLabel}>Skills to develop:</span>
                            <div className={styles.gapsList}>
                              {career.skillGaps.slice(0, 3).map((gap, gapIndex) => (
                                <span key={gapIndex} className={styles.gapTag}>
                                  {typeof gap === 'object' ? gap.skill : gap}
                                </span>
                              ))}
                              {career.skillGaps.length > 3 && (
                                <span className={styles.gapTag}>
                                  +{career.skillGaps.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {career.strengths && career.strengths.length > 0 && (
                          <div className={styles.strengths}>
                            <CheckCircle size={14} />
                            <span>{career.strengths[0]}</span>
                          </div>
                        )}
                        
                        <div className={styles.careerFooter}>
                          <span className={styles.viewDetails}>
                            View Details
                            <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Match analysis section */}
            {selectedCareer && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <PieChart size={20} />
                  <h2>Match Analysis</h2>
                </div>
                
                <div className={styles.analysisContent}>
                  {selectedCareer.breakdown && (
                    <div className={styles.scoreBreakdown}>
                      <h3>Compatibility Breakdown</h3>
                      <div className={styles.scoreGrid}>
                        {Object.entries(selectedCareer.breakdown).map(([category, score]) => (
                          <div key={category} className={styles.scoreItem}>
                            <div className={styles.scoreBar}>
                              <div 
                                className={styles.scoreFill} 
                                style={{ width: `${(score * 100)}%` }}
                              />
                            </div>
                            <div className={styles.scoreInfo}>
                              <span className={styles.scoreCategory}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </span>
                              <span className={styles.scoreValue}>
                                {Math.round(score * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedCareer.marketInsights && (
                    <div className={styles.marketInsights}>
                      <h3>Market Insights</h3>
                      <div className={styles.insightsList}>
                        <div className={styles.insight}>
                          <TrendingUp size={16} />
                          <span>Growth: {selectedCareer.marketInsights.jobGrowth}</span>
                        </div>
                        <div className={styles.insight}>
                          <BarChart3 size={16} />
                          <span>Competition: {selectedCareer.marketInsights.competitionLevel}</span>
                        </div>
                        <div className={styles.insight}>
                          <Zap size={16} />
                          <span>Automation Risk: {selectedCareer.marketInsights.automationRisk}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button className={styles.fullReportButton}>
                    Generate Full Career Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;