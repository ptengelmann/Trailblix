// src/pages/Home/components/CTASection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import styles from './CTASection.module.scss';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.cta}>
      <div className={styles.ctaBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaHeader}>
            <div className={styles.ctaTag}>
              <Sparkles size={16} />
              <span>Ready to Transform Your Career?</span>
            </div>
            
            <h2>
              Your dream career is just{' '}
              <span className={styles.gradient}>one click away</span>
            </h2>
            
            <p>
              Join thousands of professionals who have discovered their perfect 
              career path with our AI-powered platform. Start your journey today 
              and unlock your true potential.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <button 
              className={styles.primaryCTA}
              onClick={() => navigate('/register')}
            >
              Start Free Assessment
              <ArrowRight size={20} />
            </button>
            
            <button 
              className={styles.secondaryCTA}
              onClick={() => navigate('/login')}
            >
              Already have an account?
            </button>
          </div>

          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature}>
              <Target size={20} />
              <span>Free forever</span>
            </div>
            <div className={styles.ctaFeature}>
              <TrendingUp size={20} />
              <span>Instant results</span>
            </div>
            <div className={styles.ctaFeature}>
              <Sparkles size={20} />
              <span>AI-powered</span>
            </div>
          </div>
        </div>

        <div className={styles.ctaVisual}>
          <div className={styles.floatingElements}>
            <div className={styles.floatingCard}>
              <div className={styles.cardIcon}>
                <Target size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>Perfect Match Found!</h4>
                <p>96% compatibility</p>
              </div>
            </div>
            
            <div className={styles.floatingCard}>
              <div className={styles.cardIcon}>
                <TrendingUp size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>Career Growth</h4>
                <p>$120K+ potential</p>
              </div>
            </div>
            
            <div className={styles.floatingCard}>
              <div className={styles.cardIcon}>
                <Sparkles size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>Learning Path</h4>
                <p>6 months to goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;