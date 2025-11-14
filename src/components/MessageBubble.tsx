import React from 'react';
import { Message } from '../types/types';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble-container ${isCurrentUser ? 'current-user' : 'other-user'}`}>
      {!isCurrentUser && (
        <div className="user-avatar">
          {message.userName.substring(0, 2).toUpperCase()}
        </div>
      )}
      
      <div className="message-content">
        {!isCurrentUser && (
          <div className="sender-name">{message.userName}</div>
        )}
        
        <div className="bubble-wrapper">
          <div className="message-bubble">
            <div className="message-text">{message.text}</div>
            <div className="message-time">{formatTime(message.timestamp)}</div>
          </div>
        </div>
      </div>

      {isCurrentUser && (
        <div className="user-avatar current">
          {message.userName.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;