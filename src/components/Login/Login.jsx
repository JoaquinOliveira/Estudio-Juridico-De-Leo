import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import { login } from './authService';
import { getConfig } from './config';

const Login = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            const config = getConfig();
            const { username, password } = values;
            console.log(username)
            console.log(password)
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
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <Spin spinning={loading} tip="Iniciando sesión...">
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Por favor, ingrese su usuario' },
                            { min: 4, message: 'El usuario debe tener al menos 4 caracteres' },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Usuario" aria-label="Usuario" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Por favor, ingrese su contraseña' },
                            { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" aria-label="Contraseña" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="login-button" type="primary" htmlType="submit" disabled={loading}>
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};

export default Login;