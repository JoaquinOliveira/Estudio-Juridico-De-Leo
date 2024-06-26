import React, { useState } from 'react';
import { Form, Input, Button, message, Spin, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './authService';
import { getConfig } from './config';
import './Login.css';

const Login = ({ onLogin, darkMode }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const config = getConfig();
            const { username, password } = values;
            const isAuthenticated = await login(username, password, config);
            
            if (isAuthenticated) {
                message.success('Inicio de sesión exitoso');
                onLogin();
            } else {
                message.error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            message.error('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
        setLoading(false);
    };

    return (
        <div className={`login-container ${darkMode ? 'dark' : 'light'}`}>
            <Card className="login-card">
                <h1 className="login-title">Iniciar sesión</h1>
                <Spin spinning={loading} tip="Iniciando sesión...">
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: 'Por favor, ingrese su usuario' },
                                { min: 4, message: 'El usuario debe tener al menos 4 caracteres' },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Usuario" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Por favor, ingrese su contraseña' },
                                { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button" disabled={loading}>
                                Ingresar
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default Login;