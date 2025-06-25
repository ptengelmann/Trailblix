import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TEMPORARY: simulate fetching latest user
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[data.length - 1]); // grab most recent user
        }
      })
      .catch(err => console.error('Dashboard fetch error:', err));
  }, []);

  if (!user) return <div className={styles.loading}>Loading your profile...</div>;

  return (
    <div className={styles.dashboard}>
      <h2>Welcome, {user.name}</h2>

      <div className={styles.section}>
        <h3>Your Profile</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Education:</strong> {user.education}</p>
        <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
        <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
      </div>

      <div className={styles.section}>
        <h3>Career Suggestions</h3>
        <p>(Coming soon — AI module in progress)</p>
      </div>

      <div className={styles.section}>
        <h3>Learning Plan</h3>
        <p>(Coming soon — personalized resources powered by AI)</p>
      </div>
    </div>
  );
};

export default Dashboard;
