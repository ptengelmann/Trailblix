// src/pages/Home/components/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles, Users, TrendingUp } from 'lucide-react';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>
      

      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>
              <Sparkles size={16} />
              <span>AI-Powered Career Intelligence</span>
            </div>
            
            <h1>
              Your{' '}
              <span className={styles.gradient}>AI Career Co-Pilot</span>{' '}
              for the Future
            </h1>
            
            <p>
              Discover personalized career paths, master in-demand skills, and 
              accelerate your professional growth with cutting-edge AI insights 
              tailored just for you.
            </p>
            
            <div className={styles.heroActions}>
              <button 
                className={styles.primaryCTA}
                onClick={() => navigate('/register')}
              >
                Start Your Journey
                <ArrowRight size={20} />
              </button>
              
              <button 
                className={styles.secondaryCTA}
                onClick={() => navigate('/login')}
              >
                I Have an Account
              </button>
            </div>
            
            <div className={styles.socialProof}>
              <div className={styles.proofItem}>
                <Users size={16} />
                <span>10K+ professionals</span>
              </div>
              <div className={styles.proofItem}>
                <TrendingUp size={16} />
                <span>95% career satisfaction</span>
              </div>
              <div className={styles.proofItem}>
                <Brain size={16} />
                <span>AI-powered insights</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.floatingCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAvatar}></div>
                <div>
                  <h4>Alex Chen</h4>
                  <p>Software Developer</p>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.matchScore}>
                  <span>Career Match</span>
                  <strong>94%</strong>
                </div>
                <div className={styles.cardSkills}>
                  <span className={styles.skillTag}>React</span>
                  <span className={styles.skillTag}>Python</span>
                  <span className={styles.skillTag}>AI/ML</span>
                </div>
              </div>
            </div>
            
            <div className={styles.floatingStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>$120K</span>
                <span className={styles.statLabel}>Avg Salary</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>Job Demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;