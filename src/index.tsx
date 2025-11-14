import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // 确保 App.tsx 在 src 根目录

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);