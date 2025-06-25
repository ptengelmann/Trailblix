import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [careers, setCareers] = useState([]);

  // Get most recent user
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[data.length - 1]);
        }
      })
      .catch(err => console.error('Dashboard fetch error:', err));
  }, []);

  // When user is loaded, fetch AI career suggestions
  useEffect(() => {
    if (user) {
      fetch('/api/users/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: user.skills,
          interests: user.interests
        })
      })
        .then(res => res.json())
        .then(data => setCareers(data))
        .catch(err => console.error('Career suggestion error:', err));
    }
  }, [user]);

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
        {careers.length === 0 ? (
          <p>No strong matches yet. Try refining your profile.</p>
        ) : (
          <ul>
            {careers.map((c, index) => (
              <li key={index}>
                <strong>{c.title}</strong> — Confidence: {c.confidence}%
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h3>Learning Plan</h3>
        <p>(Coming soon — personalized resources powered by AI)</p>
      </div>
    </div>
  );
};

export default Dashboard;
