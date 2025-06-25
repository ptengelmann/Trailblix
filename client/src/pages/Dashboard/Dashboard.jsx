// pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
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
 PieChart
} from 'lucide-react';
import styles from './dashboard.module.scss';

const Dashboard = () => {
 const [user, setUser] = useState(null);
 const [careers, setCareers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [selectedCareer, setSelectedCareer] = useState(null);

 // Get most recent user
 useEffect(() => {
   fetch('/api/users')
     .then(res => {
       if (!res.ok) throw new Error('Failed to fetch users');
       return res.json();
     })
     .then(data => {
       if (Array.isArray(data) && data.length > 0) {
         setUser(data[0]);
       } else {
         setError('No user data found');
       }
     })
     .catch(err => {
       console.error('Dashboard fetch error:', err);
       setError('Failed to load user data');
     })
     .finally(() => setLoading(false));
 }, []);

 // When user is loaded, fetch AI career suggestions
 useEffect(() => {
   if (user) {
     console.log('Fetching career suggestions for user:', user);
     
     fetch('/api/users/suggest', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         skills: user.skills || [],
         interests: user.interests || [],
         personality: user.personality || [],
         workValues: user.workValues || [],
         yearsOfExperience: user.yearsOfExperience || 0,
         preferences: user.preferences || {}
       })
     })
       .then(res => {
         if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
         return res.json();
       })
       .then(data => {
         console.log('Career suggestions received:', data);
         if (Array.isArray(data)) {
           setCareers(data);
           if (data.length > 0) {
             setSelectedCareer(data[0]);
           }
         } else if (data.fallback && Array.isArray(data.fallback)) {
           setCareers(data.fallback);
           setError('Using fallback recommendations');
         } else {
           setCareers([]);
           setError('Invalid career data received');
         }
       })
       .catch(err => {
         console.error('Career suggestion error:', err);
         setError('Failed to load career suggestions');
         setCareers([]);
       });
   }
 }, [user]);

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

 if (loading) {
   return (
     <div className={styles.loadingContainer}>
       <div className={styles.loadingSpinner}>
         <Brain size={32} />
       </div>
       <p>Analyzing your career profile...</p>
     </div>
   );
 }

 if (error && !user) {
   return (
     <div className={styles.errorContainer}>
       <AlertCircle size={48} />
       <h2>Unable to Load Profile</h2>
       <p>{error}</p>
     </div>
   );
 }

 return (
   <div className={styles.dashboard}>
     <div className={styles.header}>
       <div className={styles.welcomeSection}>
         <div className={styles.userAvatar}>
           <User size={24} />
         </div>
         <div className={styles.userInfo}>
           <h1>Welcome back, {user?.name || 'User'}</h1>
           <p>Your AI-powered career insights are ready</p>
         </div>
       </div>
       
       <div className={styles.profileStats}>
         <div className={styles.statCard}>
           <Target size={20} />
           <div>
             <span className={styles.statNumber}>{careers.length}</span>
             <span className={styles.statLabel}>Career Matches</span>
           </div>
         </div>
         <div className={styles.statCard}>
           <CheckCircle size={20} />
           <div>
             <span className={styles.statNumber}>{user?.completionPercentage || 85}%</span>
             <span className={styles.statLabel}>Profile Complete</span>
           </div>
         </div>
         <div className={styles.statCard}>
           <BookOpen size={20} />
           <div>
             <span className={styles.statNumber}>
               {Array.isArray(user?.skills) ? user.skills.length : 0}
             </span>
             <span className={styles.statLabel}>Skills Assessed</span>
           </div>
         </div>
       </div>
     </div>

     {error && (
       <div className={styles.errorBanner}>
         <AlertCircle size={16} />
         <span>{error}</span>
       </div>
     )}

     <div className={styles.mainContent}>
       <div className={styles.leftColumn}>
         <div className={styles.section}>
           <div className={styles.sectionHeader}>
             <User size={20} />
             <h2>Your Profile Overview</h2>
           </div>
           
           <div className={styles.profileGrid}>
             <div className={styles.profileItem}>
               <Briefcase size={16} />
               <div>
                 <span className={styles.profileLabel}>Current Role</span>
                 <span className={styles.profileValue}>
                   {user?.currentRole || 'Not specified'}
                 </span>
               </div>
             </div>
             
             <div className={styles.profileItem}>
               <Calendar size={16} />
               <div>
                 <span className={styles.profileLabel}>Experience</span>
                 <span className={styles.profileValue}>
                   {user?.yearsOfExperience ? `${user.yearsOfExperience} years` : 'Entry level'}
                 </span>
               </div>
             </div>
             
             <div className={styles.profileItem}>
               <Award size={16} />
               <div>
                 <span className={styles.profileLabel}>Education</span>
                 <span className={styles.profileValue}>
                   {typeof user?.education === 'object' 
                     ? `${user.education.level || 'Not specified'}${user.education.field ? ` in ${user.education.field}` : ''}`
                     : user?.education || 'Not provided'
                   }
                 </span>
               </div>
             </div>
             
             <div className={styles.profileItem}>
               <MapPin size={16} />
               <div>
                 <span className={styles.profileLabel}>Work Preference</span>
                 <span className={styles.profileValue}>
                   {user?.preferences?.workEnvironment || 'Flexible'}
                 </span>
               </div>
             </div>
           </div>

           {user?.skills && Array.isArray(user.skills) && user.skills.length > 0 && (
             <div className={styles.skillsSection}>
               <h3>
                 <Zap size={16} />
                 Skills Portfolio
               </h3>
               <div className={styles.skillsGrid}>
                 {user.skills.slice(0, 8).map((skill, index) => {
                   const skillName = typeof skill === 'object' ? skill.name : skill;
                   const skillLevel = typeof skill === 'object' ? skill.level : 'intermediate';
                   
                   return (
                     <div key={index} className={styles.skillTag}>
                       {getSkillLevelIcon(skillLevel)}
                       <span>{skillName}</span>
                     </div>
                   );
                 })}
                 {user.skills.length > 8 && (
                   <div className={styles.skillTag}>
                     <span>+{user.skills.length - 8} more</span>
                   </div>
                 )}
               </div>
             </div>
           )}
         </div>

         <div className={styles.section}>
           <div className={styles.sectionHeader}>
             <BookOpen size={20} />
             <h2>Learning Roadmap</h2>
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
       </div>

       <div className={styles.rightColumn}>
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
                       
                       <div className={styles.confidenceScore} style={{ color: confidence.color }}>
                         <span className={styles.confidenceNumber}>{career.confidence || 0}%</span>
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
                           <span>{career.marketData?.demandLevel || career.marketDemand}</span>
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
                               {gap.skill}
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
                           <span className={styles.scoreValue}>{Math.round(score * 100)}%</span>
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
             </div>
           </div>
         )}
       </div>
     </div>
   </div>
 );
};

export default Dashboard;