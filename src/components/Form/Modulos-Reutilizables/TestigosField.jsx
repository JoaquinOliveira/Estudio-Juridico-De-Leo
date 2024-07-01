import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const TestigosField = () => {
    return (
        <Form.Item
            name="testigos"
            label="Testigos"
            rules={[
                {
                    required: true,
                    message: "Por favor ingrese los nombres de los testigos.",
                },
            ]}
        >
            <TextArea
                placeholder="Ingrese los nombres de los testigos, uno por línea"
                autoSize={{ minRows: 2, maxRows: 6 }}
            />
        </Form.Item>
    );
};

export default TestigosField;