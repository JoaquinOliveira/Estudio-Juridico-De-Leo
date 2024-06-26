import React from 'react';
import { Form, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';

// Asegúrate de instalar esta biblioteca: npm install number-to-words
import { toWords } from 'number-to-words';

const MontoField = () => {
    const [form] = useForm();

    const convertToWordsAndFormat = (value) => {
        if (!value) return '';

        // Convertir a palabras en inglés
        let words = toWords(value);

        // Convertir la primera letra a mayúscula
        words = words.charAt(0).toUpperCase() + words.slice(1);

        // Aquí deberías usar una biblioteca o función para convertir a español
        // Por ahora, usaremos el inglés como ejemplo

        return `PESOS ${words} ($${value.toLocaleString('es-AR')})`;
    };

    return (
        <Form.Item
            label="Monto (en pesos)"
            name="monto"
            rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
            getValueFromEvent={(value) => {
                form.setFieldsValue({ montoEnPalabras: convertToWordsAndFormat(value) });
                return value;
            }}
        >
            <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Ingrese el monto en pesos"
            />
        </Form.Item>
    );
};

export default MontoField;