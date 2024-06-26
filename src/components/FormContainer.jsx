import React from 'react';
import { Card, Typography } from 'antd';
import BackButton from './BackButton';

const { Title } = Typography;

const FormContainer = ({ title, children, onBack }) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Card style={{ width: '100%', maxWidth: '800px' }}>
            <BackButton onClick={onBack} />
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>{title}</Title>
            {children}
        </Card>
    </div>
);

export default FormContainer;