import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { 
  Brain, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Sparkles,
  Users,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import styles from './auth.module.scss';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [fieldFocus, setFieldFocus] = useState(null);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [formValidity, setFormValidity] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
  // Refs for 3D tilt effect
  const authCardRef = useRef(null);
  const floatingCardRef = useRef(null);
  const statItemRefs = useRef([]);
  
  // Refs for password strength
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  
  // Function to validate email format
  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Enhanced password strength evaluation
  const validatePassword = (password) => {
    let strength = 0;
    
    // Basic length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 0.5;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Pattern checks
    if (/[A-Z].*[A-Z]/.test(password)) strength += 0.5; // At least 2 uppercase
    if (/\d.*\d/.test(password)) strength += 0.5; // At least 2 digits
    if (/[^A-Za-z0-9].*[^A-Za-z0-9]/.test(password)) strength += 0.5; // At least 2 special chars
    
    // Penalize common patterns
    if (/^123/.test(password) || /password/i.test(password) || /qwerty/i.test(password)) {
      strength -= 1;
    }
    
    // Cap the strength between 0 and 5
    return Math.max(0, Math.min(5, strength));
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
    if (name === 'name') {
      setFormValidity({
        ...formValidity,
        name: value.trim().length >= 2
      });
    } else if (name === 'email') {
      setFormValidity({
        ...formValidity,
        email: isValidEmail(value)
      });
    } else if (name === 'password') {
      const strength = validatePassword(value);
      setPasswordStrength(strength);
      
      setFormValidity({
        ...formValidity,
        password: strength >= 3,
        confirmPassword: formData.confirmPassword === value && formData.confirmPassword.length > 0
      });
      
      // Animated strength meter visual feedback
      if (passwordRef.current) {
        if (strength <= 2) {
          passwordRef.current.classList.add('invalid-shake');
          setTimeout(() => {
            if (passwordRef.current) {
              passwordRef.current.classList.remove('invalid-shake');
            }
          }, 500);
        } else if (strength >= 4) {
          passwordRef.current.classList.add('success-pulse');
          setTimeout(() => {
            if (passwordRef.current) {
              passwordRef.current.classList.remove('success-pulse');
            }
          }, 1000);
        }
      }
    } else if (name === 'confirmPassword') {
      const matches = formData.password === value;
      
      setFormValidity({
        ...formValidity,
        confirmPassword: matches && value.length > 0
      });
      
      // Visual feedback for password match
      if (confirmPasswordRef.current) {
        if (!matches && value.length > 0) {
          confirmPasswordRef.current.classList.add('invalid-shake');
          setTimeout(() => {
            if (confirmPasswordRef.current) {
              confirmPasswordRef.current.classList.remove('invalid-shake');
            }
          }, 500);
        } else if (matches && value.length > 0) {
          confirmPasswordRef.current.classList.add('success-pulse');
          setTimeout(() => {
            if (confirmPasswordRef.current) {
              confirmPasswordRef.current.classList.remove('success-pulse');
            }
          }, 1000);
        }
      }
    }
    
    if (error) setError('');
  };
  
  // Validate form on submit
  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    
    if (!name.trim()) {
      setError('Please enter your name');
      return false;
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
    const result = await register(formData.name, formData.email, formData.password);
    
    if (!result.success) {
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
        
        // Redirect after animation completes - always to onboarding for new users
        setTimeout(() => {
          navigate('/onboarding');
        }, 1000);
      } else {
        navigate('/onboarding');
      }
    }
  } catch (err) {
    setError('An unexpected error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};
  
  // Password strength helpers
  const getStrengthColor = () => {
    if (passwordStrength <= 2) return '#EF4444';
    if (passwordStrength <= 3) return '#F59E0B';
    return '#10B981';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'None';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    if (passwordStrength <= 4) return 'Strong';
    return 'Excellent';
  };

  const getStrengthWidth = () => {
    return `${(passwordStrength / 5) * 100}%`;
  };
  
  // Password requirements helper
  const getPasswordRequirements = () => {
    const { password } = formData;
    
    if (!password) return null;
    
    return (
      <div className={styles.passwordRequirements}>
        <div className={`${styles.requirement} ${password.length >= 8 ? styles.met : ''}`}>
          <CheckCircle size={12} /> At least 8 characters
        </div>
        <div className={`${styles.requirement} ${/[A-Z]/.test(password) ? styles.met : ''}`}>
          <CheckCircle size={12} /> Contains uppercase letter
        </div>
        <div className={`${styles.requirement} ${/[a-z]/.test(password) ? styles.met : ''}`}>
          <CheckCircle size={12} /> Contains lowercase letter
        </div>
        <div className={`${styles.requirement} ${/[^A-Za-z0-9]/.test(password) ? styles.met : ''}`}>
          <CheckCircle size={12} /> Contains special character
        </div>
      </div>
    );
  };
  
  // Generate particles for background effect
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(<div key={i} className={styles.particle}></div>);
    }
    return particles;
  };

  // Handle focus events for enhanced UI feedback
  const handleFocus = (field) => {
    setFieldFocus(field);
  };

  const handleBlur = () => {
    setFieldFocus(null);
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
              Begin your journey with your{' '}
              <span className={styles.gradient} data-text="AI Career Co-Pilot">AI Career Co-Pilot</span>
            </h1>
            
            <p>Unlock personalized career paths, master in-demand skills, and accelerate your professional growth with cutting-edge AI insights.</p>
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
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div 
                className={`${styles.inputGroup} ${fieldFocus === 'name' ? styles.focused : ''}`}
              >
                <label htmlFor="name">
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className={`${styles.premiumInput} ${formTouched.name && !formValidity.name ? styles.invalid : ''}`}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                
                {formTouched.name && !formValidity.name && formData.name.trim() && (
                  <div className={styles.inputFeedback}>
                    <AlertCircle size={12} />
                    <span>Name should be at least 2 characters</span>
                  </div>
                )}
                
                {formValidity.name && formData.name.trim() && (
                  <div className={`${styles.inputFeedback} ${styles.valid}`}>
                    <CheckCircle size={12} />
                    <span>Looks good!</span>
                  </div>
                )}
              </div>

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
                
                {formValidity.email && formData.email && (
                  <div className={`${styles.inputFeedback} ${styles.valid}`}>
                    <CheckCircle size={12} />
                    <span>Valid email format</span>
                  </div>
                )}
              </div>

              <div 
                className={`${styles.inputGroup} ${fieldFocus === 'password' ? styles.focused : ''}`}
                ref={passwordRef}
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
                    placeholder="Create a strong password"
                    required
                    disabled={loading}
                    className={`${styles.premiumInput} ${formTouched.password && !formValidity.password ? styles.invalid : ''}`}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    autoComplete="new-password"
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
                
                {formData.password && (
                  <>
                    <div className={styles.passwordStrength}>
                      <div className={styles.strengthBar}>
                        <div 
                          className={`${styles.strengthFill} ${passwordStrength >= 4 ? styles.strong : ''}`}
                          style={{ 
                            width: getStrengthWidth(),
                            backgroundColor: getStrengthColor()
                          }}
                        ></div>
                      </div>
                      <span 
                        className={styles.strengthText}
                        style={{ color: getStrengthColor() }}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    
                    {getPasswordRequirements()}
                  </>
                )}
              </div>

              <div 
                className={`${styles.inputGroup} ${fieldFocus === 'confirmPassword' ? styles.focused : ''}`}
                ref={confirmPasswordRef}
              >
                <label htmlFor="confirmPassword">
                  <ShieldCheck size={16} />
                  Confirm Password
                </label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                    className={`${styles.premiumInput} ${formTouched.confirmPassword && !formValidity.confirmPassword ? styles.invalid : ''}`}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {formTouched.confirmPassword && formData.confirmPassword && (
                  <div className={`${styles.inputFeedback} ${formValidity.confirmPassword ? styles.valid : ''}`}>
                    {formValidity.confirmPassword ? (
                      <>
                        <CheckCircle size={12} />
                        <span>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} />
                        <span>Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    <span className={styles.buttonText}>Creating your AI-powered account...</span>
                  </>
                ) : (
                  <>
                    <span className={styles.buttonText}>
                      Start Your AI Journey <Zap size={16} className={styles.buttonIcon} />
                    </span>
                    <ArrowRight size={16} className={styles.arrowIcon} />
                  </>
                )}
                
                {/* Button background effect */}
                <span className={styles.buttonEffect}></span>
              </button>
            </form>

            <div className={styles.authFooter}>
              <p>
                Already have an account?{' '}
                <Link to="/login" className={styles.authLink}>
                  Continue your journey
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
                <h4>Michael Park</h4>
                <p>Product Manager</p>
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.matchScore}>
                <span>Career Match</span>
                <strong>98%</strong>
              </div>
              <div className={styles.cardSkills}>
                <span className={styles.skillTag}>Strategy</span>
                <span className={styles.skillTag}>Analytics</span>
                <span className={styles.skillTag}>Leadership</span>
              </div>
            </div>
          </div>

          <div className={styles.floatingStats}>
            <div 
              className={styles.statItem}
              ref={el => statItemRefs.current[0] = el}
            >
              <span className={styles.statNumber}>2.5x</span>
              <span className={styles.statLabel}>Faster Growth</span>
            </div>
            <div 
              className={styles.statItem}
              ref={el => statItemRefs.current[1] = el}
            >
              <span className={styles.statNumber}>$150K</span>
              <span className={styles.statLabel}>Target Salary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
