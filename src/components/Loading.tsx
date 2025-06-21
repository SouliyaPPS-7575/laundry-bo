import { Spin } from 'antd'; // Assuming you're using Ant Design for the UI
import React from 'react';

export const Loading: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Spin size="large" /> {/* Replace with your loading UI */}
  </div>
);
