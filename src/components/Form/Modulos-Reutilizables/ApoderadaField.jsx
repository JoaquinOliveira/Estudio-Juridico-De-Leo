import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const ApoderadaField = () => {
    return (
        <Form.Item
            name="apoderada"
            label="Apoderada"
            rules={[
                {
                    required: true,
                    message: "Por favor ingrese la apoderada de la firma",
                },
            ]}
        >
            <TextArea
                placeholder="Ingres la apoderada / el apoderado, de la firma"

            />
        </Form.Item>
    );
};

export default ApoderadaField;