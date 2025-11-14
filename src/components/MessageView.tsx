import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Message } from '../types/types';
import MessageBubble from './MessageBubble';
import './MessageView.css';

const MessageView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser') || '';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 模拟数据
    const mockMessages: Message[] = [
      {
        id: '1',
        text: 'Long time not seen. How have you been?',
        timestamp: new Date(Date.now() - 3600000), // 1小时前
        userId: 'user1',
        userName: 'Aigns'
      },
      {
        id: '2', 
        text: 'Yes, you are right! We should meet again for a coffee together. When are you free?',
        timestamp: new Date(Date.now() - 1800000), // 30分钟前
        userId: 'current',
        userName: currentUser
      },
      {
        id: '3',
        text: 'I was thinking maybe this Friday afternoon? There is a nice new café downtown.',
        timestamp: new Date(Date.now() - 1200000), // 20分钟前
        userId: 'user1',
        userName: 'Aigns'
      },
      {
        id: '4',
        text: 'That sounds perfect! Friday at 3 PM works great for me. Looking forward to it!',
        timestamp: new Date(Date.now() - 600000), // 10分钟前
        userId: 'current',
        userName: currentUser
      }
    ];
    setMessages(mockMessages);
  }, [channelId, currentUser]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date(),
        userId: 'current',
        userName: currentUser
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-view-container">
      {/* 顶部导航栏 */}
      <div className="message-header">
        <button onClick={() => navigate('/channels')} className="back-button">
          ← Back
        </button>
        <div className="channel-info">
          <div className="channel-avatar-small">
            {channelId === '1' ? 'AI' : channelId === '2' ? 'PI' : 'PO'}
          </div>
          <div className="channel-details">
            <h2 className="channel-name">Aigns</h2>
            <span className="online-status">Online</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button">📞</button>
          <button className="icon-button">ⓘ</button>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="messages-area">
        <div className="messages-container">
          {messages.map(message => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isCurrentUser={message.userName === currentUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="message-input-container">
        <div className="input-wrapper">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-input"
            rows={1}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="send-button"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageView;