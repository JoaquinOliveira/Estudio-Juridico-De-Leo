import React from 'react';
import { Form, Input } from 'antd';

const DemandadoField = () => {
    const handleUppercase = (e, form) => {
        const { name, value } = e.target;
        form.setFieldsValue({ [name]: value.toUpperCase() });
    };

    return (
        <Form.Item noStyle shouldUpdate>
            {(form) => (
                <>
                    <Form.Item
                        label="Nombre del Demandado"
                        name="nombreDemandado"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del demandado' }]}
                    >
                        <Input
                            placeholder="Ingrese el nombre del demandado"
                            onChange={(e) => handleUppercase(e, form)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Domicilio del Demandado"
                        name="domicilioDemandado"
                        rules={[{ required: true, message: 'Por favor ingrese el domicilio del demandado' }]}
                    >
                        <Input
                            placeholder="Ingrese el domicilio del demandado"
                            onChange={(e) => handleUppercase(e, form)}
                        />
                    </Form.Item>
                </>
            )}
        </Form.Item>
    );
};

export default DemandadoField;