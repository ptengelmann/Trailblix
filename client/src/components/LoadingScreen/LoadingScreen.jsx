// src/components/LoadingScreen/LoadingScreen.jsx
import React from 'react';
import { Brain } from 'lucide-react';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.logoContainer}>
          <Brain size={48} />
          <h1>Trailblix</h1>
        </div>
        <div className={styles.spinner}></div>
        <p>Loading your career journey...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;