import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 添加单独的样式文件

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('currentUser', username);
      navigate('/channels');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="app-title">The Messenger</h1>
          <p className="app-subtitle">Connect with your channels</p>
        </div>
        
        <div className="login-form">
          <div className="input-group">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>
          
          <button 
            className="login-button"
            onClick={handleLogin}
            disabled={!username.trim()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;