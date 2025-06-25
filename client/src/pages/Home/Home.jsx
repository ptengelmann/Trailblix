import React from 'react';
import styles from './home.module.scss';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
