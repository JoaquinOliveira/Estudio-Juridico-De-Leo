import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const PersonasField = () => {
    const numeroAPalabra = (numero) => {
        const unidades = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        const centenas = ['ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos'];

        if (numero === 100) return 'cien';
        if (numero <= 9) return unidades[numero];
        if (numero <= 29) return decenas[Math.floor(numero / 10) - 1] + (numero % 10 !== 0 ? ' y ' + unidades[numero % 10] : '');
        if (numero <= 99) return decenas[Math.floor(numero / 10) - 1] + (numero % 10 !== 0 ? ' y ' + unidades[numero % 10] : '');
        
        const centena = Math.floor(numero / 100);
        const resto = numero % 100;
        let resultado = centenas[centena - 1];
        if (resto !== 0) {
            if (resto <= 9) resultado += ' ' + unidades[resto];
            else if (resto <= 29) resultado += ' ' + decenas[Math.floor(resto / 10) - 1] + (resto % 10 !== 0 ? ' y ' + unidades[resto % 10] : '');
            else resultado += ' ' + decenas[Math.floor(resto / 10) - 1] + (resto % 10 !== 0 ? ' y ' + unidades[resto % 10] : '');
        }
        return resultado;
    };

    const opciones = Array.from({ length: 500 }, (_, i) => i + 1).map(numero => (
        <Option key={numero} value={`${numeroAPalabra(numero)} (${numero})`}>
            {numero}
        </Option>
    ));

    return (
        <Form.Item
            name="personas"
            label="Personas"
            rules={[
                {
                    required: true,
                    message: 'Por favor, seleccione el número de personas',
                },
            ]}
        >
            <Select 
                placeholder="Seleccione el número de personas"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {opciones}
            </Select>
        </Form.Item>
    );
};

export default PersonasField;