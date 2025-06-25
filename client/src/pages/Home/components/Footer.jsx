import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Trailblix. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
