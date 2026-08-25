import React, { useState, useEffect } from 'react';
import TemplateSelector from './TemplateSelector';
import Login from './Login';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
    setChecking(false);
  }, []);

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  if (checking) {
    return null;
  }

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <TemplateSelector />;
}

export default App;