import React from 'react';
import { Form, Select, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const PeriodosField = () => {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <Form.Item label="Períodos">
            <Form.List name="periodos" initialValue={[]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'mesInicio']}
                                    rules={[{ required: true, message: 'Falta mes de inicio' }]}
                                >
                                    <Select style={{ width: 120 }} placeholder="Mes inicio">
                                        {months.map((month, index) => (
                                            <Option key={`start-month-${index}`} value={month}>{month}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'añoInicio']}
                                    rules={[{ required: true, message: 'Falta año de inicio' }]}
                                >
                                    <Select style={{ width: 100 }} placeholder="Año inicio">
                                        {years.map(year => (
                                            <Option key={`start-year-${year}`} value={year}>{year}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <span>a</span>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'mesFin']}
                                    rules={[{ required: true, message: 'Falta mes de fin' }]}
                                >
                                    <Select style={{ width: 120 }} placeholder="Mes fin">
                                        {months.map((month, index) => (
                                            <Option key={`end-month-${index}`} value={month}>{month}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'añoFin']}
                                    rules={[{ required: true, message: 'Falta año de fin' }]}
                                >
                                    <Select style={{ width: 100 }} placeholder="Año fin">
                                        {years.map(year => (
                                            <Option key={`end-year-${year}`} value={year}>{year}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Agregar período
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form.Item>
    );
};

export default PeriodosField;