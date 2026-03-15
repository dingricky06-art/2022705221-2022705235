import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ChannelList from './components/ChannelList';
import MessageView from './components/MessageView';
import './styles/shared.css';

const App = () => {
  const [username, setUsername] = useState('');

  const handleLogin = useCallback((name) => {
    setUsername(name);
  }, []);

  const handleLogout = useCallback(() => {
    setUsername('');
  }, []);

  return (
    <Router>
      <div className="app-shell">
        <Routes>
          {/* Login View */}
          <Route
            path="/"
            element={
              username
                ? <Navigate to="/channels" replace />
                : <Login onLogin={handleLogin} />
            }
          />

          {/* Channel List View */}
          <Route
            path="/channels"
            element={
              username
                ? <ChannelList username={username} onLogout={handleLogout} />
                : <Navigate to="/" replace />
            }
          />

          {/* Messages in one Channel View */}
          <Route
            path="/channel/:channelId"
            element={
              username
                ? <MessageView username={username} />
                : <Navigate to="/" replace />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
