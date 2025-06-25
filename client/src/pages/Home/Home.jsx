// src/pages/Home/Home.jsx
import React from 'react';
import styles from './home.module.scss';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;