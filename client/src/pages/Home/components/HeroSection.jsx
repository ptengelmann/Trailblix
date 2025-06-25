import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <h1>Trailblix</h1>
      <p>Your AI-powered career co-pilot.</p>
      <div>
        <button onClick={() => navigate('/onboarding')}>Get Started</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </section>
  );
};

export default HeroSection;
