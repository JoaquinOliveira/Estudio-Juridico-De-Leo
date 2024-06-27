import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const ResolucionField = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <>
      <Form.Item
        label="Número de Resolución"
        name="numeroResolucion"
        rules={[{ required: true, message: 'Por favor ingrese el número de resolución' },
          { pattern: /^\d+$/, message: 'Por favor ingrese solo números' }
        ]}
      >
        <Input type='number' placeholder="Ingrese el número de resolución" />
      </Form.Item>
      <Form.Item
        label="Fecha de Resolución"
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name={['fechaResolucion', 'dia']}
          rules={[{ required: true, message: 'Requerido' }]}
          style={{ display: 'inline-block', width: 'calc(15% - 8px)', marginRight: 8 }}
        >
          <Input type="number" min={1} max={31} placeholder="Día" />
        </Form.Item>
        <Form.Item
          name={['fechaResolucion', 'mes']}
          rules={[{ required: true, message: 'Requerido' }]}
          style={{ display: 'inline-block', width: 'calc(15% - 8px)', marginRight: 8 }}
        >
          <Select placeholder="Mes">
            {months.map((month, index) => (
              <Option key={index} value={index + 1}>{month}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['fechaResolucion', 'año']}
          rules={[{ required: true, message: 'Requerido' }]}
          style={{ display: 'inline-block', width: 'calc(15% - 8px)' }}
        >
          <Select placeholder="Año">
            {years.map(year => (
              <Option key={year} value={year}>{year}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
    </>
  );
};

export default ResolucionField;