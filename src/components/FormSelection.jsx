import React from 'react';
import { Button, Row, Col, Typography, Card } from 'antd';
import { FileTextOutlined, FormOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const FormSelection = ({ onSelectForm, darkMode }) => {
    const handleSelectForm = (formType) => {
        onSelectForm(formType);
    };

    return (
        <div style={{ padding: '24px', maxWidth: 1000, margin: '0 auto' }}>
            <Card
                style={{
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                }}
                hoverable
            >
                <Title level={2} style={{ color: darkMode ? 'white' : 'black', marginBottom: '40px' }}>
                    Seleccione el tipo de demanda
                </Title>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <Button
                            type="primary"
                            icon={<FileTextOutlined />}
                            onClick={() => handleSelectForm('OSPSA')}
                            size="large"
                            block
                            style={{ height: '60px', fontSize: '18px' }}
                        >
                            OSPSA
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Button
                            type="primary"
                            icon={<FormOutlined />}
                            onClick={() => handleSelectForm('FATSA')}
                            size="large"
                            block
                            style={{ height: '60px', fontSize: '18px' }}
                        >
                            FATSA
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Button
                            type="default"
                            icon={<QuestionCircleOutlined />}
                            onClick={() => onSelectForm('otro')}
                            size="large"
                            block
                            style={{ height: '60px', fontSize: '18px', borderColor: darkMode ? '#177ddc' : '#1890ff', color: darkMode ? '#177ddc' : '#1890ff' }}
                        >
                            Otro
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default FormSelection;