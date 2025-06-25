import React from 'react';
import styles from './FeaturesSection.module.scss';
import { Compass, BookOpen, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className={styles.features}>
      <h2>Why Trailblix?</h2>
      <ul>
        <li>
          <Compass size={20} /> <span>AI-powered career discovery</span>
        </li>
        <li>
          <BookOpen size={20} /> <span>Personalized learning plans</span>
        </li>
        <li>
          <TrendingUp size={20} /> <span>Track your growth and goals</span>
        </li>
      </ul>
    </section>
  );
};

export default FeaturesSection;
