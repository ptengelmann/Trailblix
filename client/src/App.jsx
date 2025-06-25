import React from 'react';
import Onboarding from './pages/Onboarding/Onboarding';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <main>
      {/* 🔁 TEMP: switch between Onboarding and Dashboard */}
      {/* <Onboarding /> */}
      <Dashboard />
    </main>
  );
};

export default App;
