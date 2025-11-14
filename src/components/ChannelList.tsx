import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Channel } from '../types/types';
import './ChannelList.css';

const ChannelList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    // 暂时使用模拟数据
    const mockChannels: Channel[] = [
      { id: '1', name: 'Mark', lastMessage: 'Hello!', unreadCount: 2 },
      { id: '2', name: 'Picker', lastMessage: 'How are you?', unreadCount: 0 },
      { id: '3', name: 'Pool', lastMessage: 'See you later', unreadCount: 5 },
      { id: '4', name: 'Marie', lastMessage: 'Long time no see!', unreadCount: 1 },
      { id: '5', name: 'Design Team', lastMessage: 'Meeting at 3 PM', unreadCount: 0 },
    ];
    setChannels(mockChannels);
  }, []);

  return (
    <div className="channel-list-container">
      <div className="channel-list-header">
        <h1>Channels</h1>
        <div className="user-info">Welcome, {currentUser}!</div>
      </div>
      
      <div className="channels-container">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`} className="channel-item">
            <div className="channel-avatar">
              {channel.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="channel-content">
              <div className="channel-header">
                <span className="channel-name">{channel.name}</span>
                <span className="channel-time">2m ago</span>
              </div>
              <div className="channel-preview">
                <span className="last-message">{channel.lastMessage}</span>
                {channel.unreadCount && channel.unreadCount > 0 ? (
                  <span className="unread-badge">{channel.unreadCount}</span>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;