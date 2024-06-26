import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const LocalidadField = () => (
    <Form.Item
        label="Localidad"
        name="localidad"
        rules={[{ required: true, message: 'Por favor seleccione una localidad' }]}
    >
        <Select placeholder="Seleccione una localidad">
            <Option value="Avda. 101 Ricardo Balbín Nº 1717, Casillero 604, San Martín, Provincia de Buenos Aires">San Martín</Option>
            <Option value="Colegio de Abogados, Alem 430, Planta Baja, Quilmes Casillero Nº 1340, Provincia de Buenos Aires">Quilmes</Option>
            <Option value="Alem 183, Casillero 84, Lomas de Zamora, Provincia de Buenos Aires">Lomas de Zamora</Option>
        </Select>
    </Form.Item>
);

export default LocalidadField;