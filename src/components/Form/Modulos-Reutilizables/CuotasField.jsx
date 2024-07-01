import React from 'react';
import { Form, Input } from 'antd';

const CuotasField = () => {
    return (
        <Form.Item
            name="cuotas"
            label="Cuotas"
            rules={[{ required: true, message: 'Por favor, ingrese el número de cuotas' }]}
        >
            <Input placeholder="Ingrese el número de cuotas extraordinarias" />
        </Form.Item>
    );
};

export default CuotasField;