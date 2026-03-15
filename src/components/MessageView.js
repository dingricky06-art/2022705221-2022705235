import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChannels, fetchMessages, sendMessage as apiSendMessage } from '../api/chatApi';
import '../styles/shared.css';

const MessageView = ({ username }) => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  // Fetch channel info and messages from the API server
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both channels and messages from API
        const [channelsData, messagesData] = await Promise.all([
          fetchChannels(),
          fetchMessages(channelId),
        ]);
        const currentChannel = channelsData.find((c) => c.id === channelId);
        setChannel(currentChannel);
        setMessages(messagesData);
      } catch (err) {
        setError('Failed to load messages. Is the API server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [channelId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message via the API server
  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');

    try {
      const newMessage = await apiSendMessage(channelId, username, text);
      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Generate initials from channel name
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <span>Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="message-view-root">
      {/* Header */}
      <div className="header-bar" style={{ gap: '0.75rem' }}>
        <button
          onClick={() => navigate('/channels')}
          className="message-header-back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="message-header-icon">
          {getInitials(channel?.name)}
        </div>
        <div>
          <div className="message-header-name">{channel?.name || 'Channel'}</div>
          <div className="message-header-status">{messages.length} messages</div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '0.5rem 1rem' }}>
          <div className="error-box">{error}</div>
        </div>
      )}

      {/* Messages - data from API server */}
      <div className="messages-scroll">
        {messages.map((msg, i) => {
          const isMe = msg.sender === username;
          return (
            <div
              key={msg.id}
              className={`bubble-row ${isMe ? 'bubble-row--mine' : 'bubble-row--other'} fade-in`}
              style={{ animationDelay: `${Math.min(i * 0.04, 0.5)}s` }}
            >
              <div className={`bubble-wrapper ${isMe ? 'bubble-wrapper--mine' : 'bubble-wrapper--other'}`}>
                {!isMe && <span className="bubble-sender">{msg.sender}</span>}
                <div className={`bubble ${isMe ? 'bubble--mine' : 'bubble--other'}`}>
                  {msg.text}
                </div>
                <span className="bubble-time" style={{ textAlign: isMe ? 'right' : 'left' }}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Message input */}
      <div className="message-input-bar">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="send-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageView;
