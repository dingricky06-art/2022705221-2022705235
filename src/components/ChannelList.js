import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChannels } from '../api/chatApi';
import '../styles/shared.css';

const ChannelList = ({ username, onLogout }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch channel list from the API server on mount
  useEffect(() => {
    const loadChannels = async () => {
      try {
        setLoading(true);
        const data = await fetchChannels();
        setChannels(data);
      } catch (err) {
        setError('Failed to load channels. Is the API server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadChannels();
  }, []);

  const handleSelect = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  // Generate initials from channel name
  const getInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <span>Loading channels...</span>
      </div>
    );
  }

  return (
    <div className="channel-list-root">
      {/* Header */}
      <div className="channel-list-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-white)' }}>
            Channels
          </h1>
          <p className="subtitle">Welcome, {username} 👋</p>
        </div>
        <button onClick={handleLogout} className="btn-icon" title="Logout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ padding: '0 1rem' }}>
          <div className="error-box">{error}</div>
        </div>
      )}

      {/* Channel list - data comes from API */}
      <div className="channel-list-scroll">
        {channels.map((channel, index) => (
          <div
            key={channel.id}
            className="channel-item fade-in"
            style={{ animationDelay: `${index * 0.06}s` }}
            onClick={() => handleSelect(channel.id)}
          >
            <div className="channel-icon">
              {getInitials(channel.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="channel-name">{channel.name}</div>
              <div className="channel-desc">{channel.description}</div>
            </div>
            <div className="badge">{channel.memberCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
