// src/pages/Home/components/Footer.jsx
import React from 'react';
import { Brain, Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.brandLogo}>
              <Brain size={32} />
              <span>Trailblix</span>
            </div>
            <p>
              Empowering careers through AI-driven insights and personalized 
              guidance. Discover your potential and achieve your professional goals.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Career Assessment</a></li>
                <li><a href="#">Learning Paths</a></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4>Contact</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Mail size={16} />
                  <span>hello@trailblix.com</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className={styles.contactItem}>
                  <MapPin size={16} />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} Trailblix. All rights reserved.</p>
          </div>
          <div className={styles.footerMeta}>
            <span>Made with ❤️ for career growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;