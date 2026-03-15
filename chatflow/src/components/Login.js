import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    // Brief delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 500));
    onLogin(username.trim());
    navigate('/channels');
  };

  return (
    <div className="login-bg">
      {/* Decorative background orbs */}
      <div className="login-orb login-orb--1" />
      <div className="login-orb login-orb--2" />
      <div className="login-orb login-orb--3" />

      <div className={`login-card ${visible ? 'visible' : 'hidden'}`}>
        <div className="login-logo">💬</div>
        <h1 className="login-title">ChatFlow</h1>
        <p className="login-subtitle">Connect and chat with your team</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            className="input-field"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Joining...' : 'Start Chatting →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
