// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Zap,
  ArrowRight,
  Star,
  BarChart3
} from 'lucide-react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Don't show navbar on dashboard or onboarding
  if (location.pathname === '/dashboard' || location.pathname === '/onboarding') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI Career Matching',
      description: 'Get matched with perfect career paths using advanced AI',
      highlight: '95% accuracy'
    },
    {
      icon: Target,
      title: 'Skills Assessment',
      description: 'Comprehensive analysis of your current skill level',
      highlight: 'Instant results'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Real-time job market data and salary trends',
      highlight: 'Live data'
    },
    {
      icon: BookOpen,
      title: 'Learning Paths',
      description: 'Personalized roadmaps to reach your career goals',
      highlight: 'Custom plans'
    }
  ];

  const solutions = [
    {
      icon: Users,
      title: 'For Professionals',
      description: 'Advance your career with AI-powered insights',
      path: '/professionals'
    },
    {
      icon: Award,
      title: 'For Students',
      description: 'Discover your ideal career path early',
      path: '/students'
    },
    {
      icon: BarChart3,
      title: 'For Companies',
      description: 'Optimize your talent acquisition strategy',
      path: '/companies'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.navBrand} onClick={() => navigate('/')}>
          <div className={styles.logoWrapper}>
            <Brain size={32} />
            <div className={styles.logoRings}>
              <div className={styles.ring1}></div>
              <div className={styles.ring2}></div>
            </div>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Trailblix</span>
            <span className={styles.brandTagline}>AI Career Intelligence</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <div 
            className={styles.navItem}
            onMouseEnter={() => handleDropdown('features')}
            onMouseLeave={() => handleDropdown(null)}
          >
            <span className={styles.navLink}>
              Features
              <ChevronDown size={16} />
            </span>
            
            {activeDropdown === 'features' && (
              <div className={styles.megaDropdown}>
                <div className={styles.dropdownContent}>
                  <div className={styles.dropdownHeader}>
                    <h3>Powerful AI Features</h3>
                    <p>Everything you need to accelerate your career</p>
                  </div>
                  <div className={styles.featuresGrid}>
                    {features.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className={styles.featureCard}>
                          <div className={styles.featureIcon}>
                            <IconComponent size={20} />
                          </div>
                          <div className={styles.featureContent}>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                            <span className={styles.featureHighlight}>
                              {feature.highlight}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.dropdownFooter}>
                    <button 
                      className={styles.ctaButton}
                      onClick={() => navigate('/register')}
                    >
                      Start Free Assessment
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div 
            className={styles.navItem}
            onMouseEnter={() => handleDropdown('solutions')}
            onMouseLeave={() => handleDropdown(null)}
          >
            <span className={styles.navLink}>
              Solutions
              <ChevronDown size={16} />
            </span>
            
            {activeDropdown === 'solutions' && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  {solutions.map((solution, index) => {
                    const IconComponent = solution.icon;
                    return (
                      <div key={index} className={styles.solutionCard}>
                        <div className={styles.solutionIcon}>
                          <IconComponent size={18} />
                        </div>
                        <div className={styles.solutionContent}>
                          <h4>{solution.title}</h4>
                          <p>{solution.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <a href="#pricing" className={styles.navLink}>Pricing</a>
          <a href="#about" className={styles.navLink}>About</a>
        </div>

        <div className={styles.navActions}>
          <div className={styles.navStats}>
            <div className={styles.statItem}>
              <Star size={14} />
              <span>4.9/5</span>
            </div>
            <div className={styles.statItem}>
              <Users size={14} />
              <span>10K+ users</span>
            </div>
          </div>
          
          <button 
            className={styles.loginBtn}
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          
          <button 
            className={styles.signupBtn}
            onClick={() => navigate('/register')}
          >
            <Zap size={16} />
            Get Started Free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileContent}>
            <div className={styles.mobileStats}>
              <div className={styles.mobileStatCard}>
                <Star size={16} />
                <div>
                  <strong>4.9/5</strong>
                  <span>User Rating</span>
                </div>
              </div>
              <div className={styles.mobileStatCard}>
                <Users size={16} />
                <div>
                  <strong>10K+</strong>
                  <span>Professionals</span>
                </div>
              </div>
            </div>

            <div className={styles.mobileLinks}>
              <a href="#features" className={styles.mobileLink}>Features</a>
              <a href="#solutions" className={styles.mobileLink}>Solutions</a>
              <a href="#pricing" className={styles.mobileLink}>Pricing</a>
              <a href="#about" className={styles.mobileLink}>About</a>
            </div>

            <div className={styles.mobileActions}>
              <button 
                className={styles.mobileLoginBtn}
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
              <button 
                className={styles.mobileSignupBtn}
                onClick={() => navigate('/register')}
              >
                <Zap size={16} />
                Start Free Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;