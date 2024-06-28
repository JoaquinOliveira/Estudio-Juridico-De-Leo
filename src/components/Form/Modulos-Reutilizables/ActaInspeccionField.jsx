import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const ActaInspeccionField = () => {
    return (
        <Form.List name="numeroActaInspeccion">
            {(fields, { add, remove }) => (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'numero']}
                                rules={[{ required: true, message: 'Ingrese el número' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input placeholder="Nº Acta" style={{ width: '200px' }} />
                            </Form.Item>
                            <MinusCircleOutlined
                                onClick={() => remove(name)}
                                style={{ color: '#ff4d4f', fontSize: '16px' }}
                            />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                            style={{ width: '200px' }}
                        >
                            Agregar Acta
                        </Button>
                    </Form.Item>
                </div>
            )}
        </Form.List>
    );
};

export default ActaInspeccionField;