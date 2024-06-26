import React from 'react';
import { Layout, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter = ({ darkMode }) => (
  <Footer style={{ 
    textAlign: 'center', 
    background: darkMode ? 'var(--dark-background)' : 'var(--light-background)',
    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
    padding: '24px 50px'
  }}>
    <div>
      <Space size="large">
        <a href="https://facebook.com/estudiojuridiodeleo" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
        </a>
        <a href="https://twitter.com/estudiodeleo" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
        </a>
        <a href="https://linkedin.com/company/estudiodeleo" target="_blank" rel="noopener noreferrer">
          <LinkedinOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
        </a>
      </Space>
    </div>
    <div style={{ marginTop: '16px' }}>
      <a href="/terminos" style={{ marginRight: '16px', color: 'inherit' }}>Términos de Servicio</a>
      <a href="/privacidad" style={{ marginRight: '16px', color: 'inherit' }}>Política de Privacidad</a>
      <a href="/contacto" style={{ color: 'inherit' }}>Contacto</a>
    </div>
    <div style={{ marginTop: '16px', opacity: 0.7 }}>
      © 2024 Estudio Jurídico De Leo. Todos los derechos reservados.
    </div>
  </Footer>
);

export default AppFooter;