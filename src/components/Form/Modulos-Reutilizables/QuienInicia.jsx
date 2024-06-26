import React from 'react';
import { Form, Select } from 'antd';

const QuienInicia = () => {
    const { Option } = Select;


    return (
        
        <Form.Item
            className="form-item"
            label="¿Quién inicia la Demanda?"
            name="quienInicia"
            rules={[{ required: true, message: 'quien inicia es obligatorio' }]}
        >
            <Select placeholder="¿Ana o Agus?">
                <Option value="ANA MARIA DE LEO, abogada, (Tº 23 Fº 934 C.S.J.N.)">Ana</Option>
                <Option value="MARIA AGUSTINA LABOURDETTE, abogada, (Tº 23 Fº 934 C.S.J.N.)">Agus</Option>   
            </Select>
        </Form.Item>
    );
};

export default QuienInicia;