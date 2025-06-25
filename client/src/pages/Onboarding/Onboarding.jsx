import React, { useState } from 'react';
import styles from './onboarding.module.scss';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    education: '',
    interests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()),
      interests: formData.interests.split(',').map(i => i.trim()),
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Submission failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  if (submitted) return <div className={styles.success}>🎉 Profile created! Welcome to Trailblix.</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Get Started with Trailblix</h2>

      <label>Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Email</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />

      <label>Education</label>
      <input name="education" value={formData.education} onChange={handleChange} />

      <label>Skills (comma-separated)</label>
      <input name="skills" value={formData.skills} onChange={handleChange} />

      <label>Interests (comma-separated)</label>
      <input name="interests" value={formData.interests} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Onboarding;
