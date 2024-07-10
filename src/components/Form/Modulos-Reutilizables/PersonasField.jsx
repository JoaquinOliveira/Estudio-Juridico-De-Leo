import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const PersonasField = () => {
    const numeroAPalabra = (numero) => {
        const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
        const decenas = ['DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
        const centenas = ['CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS'];

        if (numero === 100) return 'CIEN';
        if (numero <= 9) return unidades[numero];
        if (numero <= 29) return decenas[Math.floor(numero / 10) - 1] + (numero % 10 !== 0 ? ' Y ' + unidades[numero % 10] : '');
        if (numero <= 99) return decenas[Math.floor(numero / 10) - 1] + (numero % 10 !== 0 ? ' Y ' + unidades[numero % 10] : '');
        
        const centena = Math.floor(numero / 100);
        const resto = numero % 100;
        let resultado = centenas[centena - 1];
        if (resto !== 0) {
            if (resto <= 9) resultado += ' ' + unidades[resto];
            else if (resto <= 29) resultado += ' ' + decenas[Math.floor(resto / 10) - 1] + (resto % 10 !== 0 ? ' Y ' + unidades[resto % 10] : '');
            else resultado += ' ' + decenas[Math.floor(resto / 10) - 1] + (resto % 10 !== 0 ? ' Y ' + unidades[resto % 10] : '');
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