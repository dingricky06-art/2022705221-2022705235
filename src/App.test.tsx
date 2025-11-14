import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // 基本测试，确保应用能正常渲染不报错
});