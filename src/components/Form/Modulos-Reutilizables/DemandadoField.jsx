import React from 'react';
import { Form, Input } from 'antd';

const DemandadoField = () => (
    <>
        <Form.Item
            label="Nombre del Demandado"
            name="nombreDemandado"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del demandado' }]}
        >
            <Input placeholder="Ingrese el nombre del demandado" />
        </Form.Item>
        <Form.Item
            label="Domicilio del Demandado"
            name="domicilioDemandado"
            rules={[{ required: true, message: 'Por favor ingrese el domicilio del demandado' }]}
        >
            <Input placeholder="Ingrese el domicilio del demandado" />
        </Form.Item>
    </>
);

export default DemandadoField;