import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { 
  Brain, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Users,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';
import styles from './auth.module.scss';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldFocus, setFieldFocus] = useState(null);
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false
  });
  const [formValidity, setFormValidity] = useState({
    email: false,
    password: false
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Refs for 3D tilt effect
  const authCardRef = useRef(null);
  const floatingCardRef = useRef(null);
  const statItemRefs = useRef([]);
  
  // Function to validate email format
  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle 3D tilt effect on cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      // For auth card
      if (authCardRef.current) {
        const card = authCardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        if (card.matches(':hover')) {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        }
      }
      
      // For floating cards
      if (floatingCardRef.current) {
        const card = floatingCardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
      }
      
      // For stat items
      statItemRefs.current.forEach(item => {
        if (item) {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          }
        }
      });
    };
    
    const handleMouseLeave = () => {
      if (authCardRef.current) {
        authCardRef.current.style.transform = '';
      }
      
      if (floatingCardRef.current) {
        floatingCardRef.current.style.transform = '';
      }
      
      statItemRefs.current.forEach(item => {
        if (item) {
          item.style.transform = '';
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    
    // Validate each field
    if (name === 'email') {
      setFormValidity({
        ...formValidity,
        email: isValidEmail(value)
      });
    } else if (name === 'password') {
      setFormValidity({
        ...formValidity,
        password: value.length >= 6
      });
    }
    
    if (error) setError('');
  };

  // Handle focus events for enhanced UI feedback
  const handleFocus = (field) => {
    setFieldFocus(field);
  };

  const handleBlur = () => {
    setFieldFocus(null);
  };
  
  // Validate form on submit
  const validateForm = () => {
    const { email, password } = formData;
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Apply shake animation to form
      if (authCardRef.current) {
        authCardRef.current.classList.add('invalid-shake');
        setTimeout(() => {
          authCardRef.current.classList.remove('invalid-shake');
        }, 500);
      }
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
    const result = await login(formData.email, formData.password, rememberMe);
    
    if (!result.success) {
      setLoginAttempts(prev => prev + 1);
      setError(result.error);
      
      // Apply shake animation
      if (authCardRef.current) {
        authCardRef.current.classList.add('invalid-shake');
        setTimeout(() => {
          authCardRef.current.classList.remove('invalid-shake');
        }, 500);
      }
    } else {
      // Show success animation before redirect
      if (authCardRef.current) {
        authCardRef.current.classList.add('success-pulse');
        
        // Redirect after animation completes
        setTimeout(() => {
          // Navigate based on onboarding status
          if (result.user.onboardingCompleted) {
            navigate('/dashboard');
          } else {
            navigate('/onboarding');
          }
        }, 1000);
      } else {
        // Navigate based on onboarding status
        if (result.user.onboardingCompleted) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      }
    }
  } catch (err) {
    setError('An unexpected error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};
  
  // Generate particles for background effect
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(<div key={i} className={styles.particle}></div>);
    }
    return particles;
  };

  return (
    <div className={styles.authContainer}>
      {/* Enhanced Background Effects */}
      <div className={styles.authBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.noiseTexture}></div>
        <div className={styles.stars}></div>
        <div className={styles.particles}>
          {renderParticles()}
        </div>
      </div>

      <div className={styles.authContent}>
        <div className={styles.authMain}>
          {/* Enhanced Header Section */}
          <div className={styles.authHeader}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>
                <Brain size={32} />
              </div>
              <span className={styles.logoText} data-text="Trailblix">Trailblix</span>
            </div>
            
            <div className={styles.heroTag}>
              <Sparkles size={16} />
              <span>AI-Powered Career Intelligence</span>
            </div>
            
            <h1>
              Welcome back to your{' '}
              <span className={styles.gradient} data-text="AI Career Co-Pilot">AI Career Co-Pilot</span>
            </h1>
            
            <p>Continue your journey to career excellence with personalized insights and opportunities.</p>
          </div>

          {/* Enhanced Form Section with 3D tilt effect */}
          <div 
            className={styles.authCard} 
            ref={authCardRef}
          >
            {error && (
              <div className={styles.errorAlert}>
                <AlertCircle size={16} />
                <span>{error}</span>
                
                {loginAttempts >= 3 && (
                  <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                    Forgot password?
                  </Link>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div 
                className={`${styles.inputGroup} ${fieldFocus === 'email' ? styles.focused : ''}`}
              >
                <label htmlFor="email">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={loading}
                  className={`${styles.premiumInput} ${formTouched.email && !formValidity.email ? styles.invalid : ''}`}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                
                {formTouched.email && !formValidity.email && formData.email && (
                  <div className={styles.inputFeedback}>
                    <AlertCircle size={12} />
                    <span>Please enter a valid email address</span>
                  </div>
                )}
              </div>

              <div 
                className={`${styles.inputGroup} ${fieldFocus === 'password' ? styles.focused : ''}`}
              >
                <label htmlFor="password">
                  <Lock size={16} />
                  Password
                </label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className={`${styles.premiumInput} ${formTouched.password && !formValidity.password ? styles.invalid : ''}`}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div className={styles.optionsGroup}>
                <div className={styles.rememberMeContainer}>
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className={styles.checkmark}></span>
                    <span>Remember me</span>
                  </label>
                </div>
                
                <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    <span className={styles.buttonText}>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span className={styles.buttonText}>
                      Continue Your Journey <Zap size={16} className={styles.buttonIcon} />
                    </span>
                    <ArrowRight size={16} className={styles.arrowIcon} />
                  </>
                )}
                
                {/* Button background effect */}
                <span className={styles.buttonEffect}></span>
              </button>
              
              <div className={styles.secureLoginInfo}>
                <Shield size={14} />
                <span>Secure, encrypted connection</span>
              </div>
            </form>

            <div className={styles.authFooter}>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className={styles.authLink}>
                  Start your AI-powered career journey
                </Link>
              </p>
            </div>
          </div>

          {/* Enhanced Social Proof */}
          <div className={styles.socialProof}>
            <div className={styles.proofItem}>
              <Users size={16} />
              <span>10K+ professionals transformed</span>
            </div>
            <div className={styles.proofItem}>
              <TrendingUp size={16} />
              <span>95% career satisfaction rate</span>
            </div>
            <div className={styles.proofItem}>
              <Brain size={16} />
              <span>AI-powered career insights</span>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Visual Elements with 3D interactions */}
        <div className={styles.floatingElements}>
          <div 
            className={styles.floatingCard}
            ref={floatingCardRef}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardAvatar}></div>
              <div>
                <h4>Sarah Johnson</h4>
                <p>Data Scientist</p>
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.matchScore}>
                <span>Career Growth</span>
                <strong>+$45K</strong>
              </div>
              <div className={styles.cardSkills}>
                <span className={styles.skillTag}>Python</span>
                <span className={styles.skillTag}>ML</span>
                <span className={styles.skillTag}>Analytics</span>
              </div>
            </div>
          </div>

          <div className={styles.floatingStats}>
            <div 
              className={styles.statItem}
              ref={el => statItemRefs.current[0] = el}
            >
              <span className={styles.statNumber}>94%</span>
              <span className={styles.statLabel}>Match Rate</span>
            </div>
            <div 
              className={styles.statItem}
              ref={el => statItemRefs.current[1] = el}
            >
              <span className={styles.statNumber}>$135K</span>
              <span className={styles.statLabel}>Avg Salary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;