import React from 'react';
import { Form, Input } from 'antd';

const ActaInspeccionField = () => (
    <Form.Item
        label="Número de Acta de Inspección"
        name="numeroActaInspeccion"
        rules={[{ required: true, message: 'Por favor ingrese el número de acta de inspección' }]}
    >
        <Input placeholder="Ingrese el número de acta de inspección" />
    </Form.Item>
);

export default ActaInspeccionField;