import React from 'react';
import { Layout, Switch, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import logo from '../utils/logo/logo.png'; // Asegúrate de que la ruta del logo sea correcta

const { Header } = Layout;
const { Title } = Typography;

const AppLayout = ({ children, darkMode, onToggleDarkMode }) => (
    <Layout className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Header className="app-header">
            <div className="header-content">
                <div className="logo-title">
                    <img src={logo} alt="Logo" className="app-logo" />
                    <Title level={3} className="app-title responsive-title">
                        Estudio Jurídico De Leo
                    </Title>
                </div>
                <Switch
                    checkedChildren={<BulbOutlined />}
                    unCheckedChildren={<BulbOutlined />}
                    checked={darkMode}
                    onChange={onToggleDarkMode}
                />
            </div>
        </Header>
        <Layout.Content className="app-content">
            {children}
        </Layout.Content>
    </Layout>
);

export default AppLayout;