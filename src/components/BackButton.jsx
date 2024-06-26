import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackButton = ({ onClick }) => (
  <Button 
    icon={<ArrowLeftOutlined />} 
    onClick={onClick}
    style={{ marginBottom: '20px' }}
  >
    Volver
  </Button>
);

export default BackButton;