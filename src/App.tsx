import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChannelList from './components/ChannelList';
import MessageView from './components/MessageView';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/channels" element={<ChannelList />} />
          <Route path="/channel/:channelId" element={<MessageView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;