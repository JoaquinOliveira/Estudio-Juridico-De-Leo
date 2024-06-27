import React from 'react';
import { Form, Input } from 'antd';

const ActaInspeccionField = () => (
    <Form.Item
        name="numeroActaInspeccion"
        label="Número de Acta de Inspección"
        rules={[
            { required: true, message: 'Por favor ingrese el número de acta de inspección' },
            { pattern: /^\d+$/, message: 'Por favor ingrese solo números' }
        ]}
    >
        <Input type="number" placeholder="Ingrese el número de acta de inspección" />
    </Form.Item>
);

export default ActaInspeccionField;