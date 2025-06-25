import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 🔥 THIS IS CRITICAL - Import your global CSS reset
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);