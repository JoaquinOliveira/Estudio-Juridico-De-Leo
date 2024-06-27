import React from 'react';
import { Form, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { NumerosALetras } from 'numero-a-letras';

const MontoField = () => {
    const [form] = useForm();

    const convertToWordsAndFormat = (value) => {
        if (!value) return '';

        // Convertir el valor a un string y manejar el formato argentino
        const cleanValue = value.toString().replace(/\$|\s/g, '').replace(',', '');
        const [integerPart, decimalPart] = cleanValue.split('.');
        
        const integerValue = parseInt(integerPart.replace(/,/g, ''));
        const centavos = decimalPart ? parseInt(decimalPart.padEnd(2, '0')) : 0;

        let wordsInteger = NumerosALetras(integerValue).toUpperCase();

        let result = `${wordsInteger}`;

        if (centavos > 0) {
            const wordsCents = NumerosALetras(centavos).toUpperCase();
            result += ` CON ${wordsCents} CENTAVOS`;
        }

        // Formatear el número en el estilo argentino
        const formattedNumber = integerValue.toLocaleString('es-AR', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }).replace(',', '.') + (decimalPart ? ',' + decimalPart.padEnd(2, '0') : ',00');

        return `PESOS ${result} ($ ${formattedNumber})`;
    };

    return (
        <Form.Item
            label="Monto (en pesos)"
            name="monto"
            rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
            getValueFromEvent={(value) => {
                const formattedValue = convertToWordsAndFormat(value);
                form.setFieldsValue({ montoEnPalabras: formattedValue });
                return value;
            }}
        >
            <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Ingrese el monto en pesos"
                decimalSeparator="."
                precision={2}
                max={999999999999.99}
            />
        </Form.Item>
    );
};

export default MontoField;