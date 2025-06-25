import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login, go to dashboard
    navigate('/dashboard');
  };

  return (
    <div className={styles.login}>
      <h2>Login to Trailblix</h2>
      <input type="email" placeholder="Your email" />
      <input type="password" placeholder="Password (fake for now)" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
