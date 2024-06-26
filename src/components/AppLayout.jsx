import React from 'react';
import { Layout, Switch, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import logo from '../utils/logo/logo.png'; // Asegúrate de tener el logo en esta ruta

const { Header, Content } = Layout;
const { Title } = Typography;

const AppLayout = ({ children, darkMode, onToggleDarkMode, onLogoClick }) => (
    <Layout className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Header className="app-header">
            <div className="header-content">
                <div className="logo-title" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="Logo" className="app-logo" />
                    <Title level={2} className="app-title" style={{marginTop: '15px'}}>
                        Estudio Jurídico De Leo
                    </Title>
                </div>
                <Switch
                    checkedChildren={<BulbOutlined style={{ fontSize: '12px' }} />}
                    unCheckedChildren={<BulbOutlined style={{ fontSize: '12px' }} />}
                    checked={darkMode}
                    onChange={onToggleDarkMode}
                    style={{ transform: 'scale(1.2)', marginBottom: '15px' }}
                />
            </div>
        </Header>
        <Content className="app-content">
            {children}
        </Content>
    </Layout>
);

export default AppLayout;