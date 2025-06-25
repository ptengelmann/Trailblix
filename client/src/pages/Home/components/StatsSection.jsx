// src/pages/Home/components/StatsSection.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import styles from './StatsSection.module.scss';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    users: 0,
    satisfaction: 0,
    placements: 0,
    avgTime: 0
  });
  
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: Users,
      number: 12500,
      suffix: '+',
      label: 'Active Users',
      description: 'Professionals using our platform'
    },
    {
      icon: TrendingUp,
      number: 95,
      suffix: '%',
      label: 'Success Rate',
      description: 'Users find their ideal career'
    },
    {
      icon: Award,
      number: 8900,
      suffix: '+',
      label: 'Career Placements',
      description: 'Successful job placements'
    },
    {
      icon: Clock,
      number: 4.2,
      suffix: ' months',
      label: 'Average Time',
      description: 'To land dream job'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const intervals = [];

    stats.forEach((stat, index) => {
      const target = stat.number;
      const increment = target / (duration / 50);
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }

        setCounts(prev => ({
          ...prev,
          [index === 0 ? 'users' : index === 1 ? 'satisfaction' : index === 2 ? 'placements' : 'avgTime']: 
            index === 3 ? current.toFixed(1) : Math.floor(current)
        }));
      }, 50);

      intervals.push(interval);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  };

  const formatNumber = (num, suffix) => {
    if (suffix === ' months') return num;
    return num.toLocaleString();
  };

  return (
    <section ref={sectionRef} className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <h2>Trusted by thousands of professionals worldwide</h2>
          <p>Join a community that's transforming careers with AI-powered insights</p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const countKey = index === 0 ? 'users' : index === 1 ? 'satisfaction' : index === 2 ? 'placements' : 'avgTime';
            
            return (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <IconComponent size={32} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>
                    {formatNumber(counts[countKey], stat.suffix)}
                    <span className={styles.statSuffix}>{stat.suffix}</span>
                  </div>
                  <h3>{stat.label}</h3>
                  <p>{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.testimonialGrid}>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p>"Trailblix helped me transition from marketing to UX design in just 6 months. The AI recommendations were spot-on!"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}></div>
                <div>
                  <strong>Sarah Chen</strong>
                  <span>UX Designer at Google</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p>"The personalized learning paths and skill gap analysis were game-changers for my career growth."</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}></div>
                <div>
                  <strong>Marcus Johnson</strong>
                  <span>Data Scientist at Microsoft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;