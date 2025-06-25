// src/pages/Home/components/FeaturesSection.jsx
import React from 'react';
import { Brain, Target, TrendingUp, Users, Zap, BookOpen, Award, BarChart3 } from 'lucide-react';
import styles from './FeaturesSection.module.scss';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Career Discovery',
      description: 'Our advanced AI analyzes your skills, interests, and personality to match you with perfect career opportunities.',
      highlight: '95% accuracy'
    },
    {
      icon: Target,
      title: 'Personalized Learning Paths',
      description: 'Get custom roadmaps with specific skills, courses, and milestones tailored to your career goals.',
      highlight: 'Custom roadmaps'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Market Insights',
      description: 'Stay ahead with live job market data, salary trends, and demand forecasts for your target roles.',
      highlight: 'Live data'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with mentors, peers, and industry professionals in your field of interest.',
      highlight: '10K+ professionals'
    },
    {
      icon: Zap,
      title: 'Skill Gap Analysis',
      description: 'Identify exactly what skills you need to develop and track your progress in real-time.',
      highlight: 'Instant analysis'
    },
    {
      icon: BookOpen,
      title: 'Curated Learning Resources',
      description: 'Access hand-picked courses, articles, and tutorials from top platforms and institutions.',
      highlight: '1000+ resources'
    },
    {
      icon: Award,
      title: 'Achievement Tracking',
      description: 'Celebrate milestones and build your professional portfolio with verified accomplishments.',
      highlight: 'Verified badges'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Visualize your career growth with detailed analytics and actionable insights.',
      highlight: 'Detailed insights'
    }
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.featuresHeader}>
          <div className={styles.headerTag}>
            <Zap size={16} />
            <span>Powerful Features</span>
          </div>
          <h2>Everything you need to accelerate your career</h2>
          <p>
            Comprehensive tools and insights powered by cutting-edge AI to help you 
            discover, plan, and achieve your career goals faster than ever.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <IconComponent size={24} />
                </div>
                <div className={styles.featureContent}>
                  <div className={styles.featureHeader}>
                    <h3>{feature.title}</h3>
                    <span className={styles.featureHighlight}>{feature.highlight}</span>
                  </div>
                  <p>{feature.description}</p>
                </div>
                <div className={styles.featureGlow}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;