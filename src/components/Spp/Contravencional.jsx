import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message, Input, Select, Space } from 'antd';
import { setFormValidity, setSubTipo, handleSubmit, generatePreview } from '../../redux/formSlice';
import '../Incompetencias/styles.css';
import DocumentPreview from '../Incompetencias/DocumentPreview';



const Contravencional = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');

    const { TextArea } = Input;


    const [form] = Form.useForm();


    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'datos', 'tiempo', 'pautas', 'imputado'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };

    const onSubmit = async (values) => {
        try {
            const result = await dispatch(handleSubmit(values));
            message.success(result.payload);
        } catch (error) {
            message.error(error.message);
        }
    };

    const handlePreview = async () => {
        try {
            const values = await form.validateFields();
            const fileContent = await dispatch(generatePreview(values)).unwrap();
            setPreviewContent(fileContent);
            setIsPreviewOpen(true);
        } catch (error) {
            message.error(error.message);
        }
    };


    const handleClosePreview = () => {
        setIsPreviewOpen(false);
        setPreviewContent('');
    };


    const validateTiempo = (_, value) => {
        const regex = /^(\w+) \((\d+)\) meses$/;
        const match = value.match(regex);

        if (!match) {
            return Promise.reject('El formato debe ser: palabra (número) meses');
        }

        const [, palabra, numero] = match;
        const numeroPalabra = {
            uno: '1',
            dos: '2',
            tres: '3',
            cuatro: '4',
            cinco: '5',
            seis: '6',
            siete: '7',
            ocho: '8',
            nueve: '9',
            diez: '10',
            once: '11',
            doce: '12',
        };

        if (numeroPalabra[palabra] !== numero) {
            return Promise.reject('El número escrito y el número entre paréntesis deben coincidir');
        }

        return Promise.resolve();
    };


    return (
        <>
            <h2 className="form-title hurto-title"> Formulario de Spp C.C.</h2>
            <Form
                className="form-item"
                form={form}
                onFinish={onSubmit}
                onFieldsChange={onFieldsChange}
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    className="form-item"
                    label="Fecha"
                    name="fecha"
                    rules={[
                        { required: true, message: 'La fecha es obligatoria' },
                        {
                            pattern: /^\d{1,2} de [a-zA-Z]+ de \d{4}$/,
                            message: 'Ingrese una fecha válida en formato "día de mes de año"',
                        },
                    ]}
                >
                    <Input placeholder="Ejemplo: 30 de diciembre de 2024" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Causa"
                    name="causa"
                    rules={[{ required: true, message: 'La causa es obligatoria' }]}
                >
                    <Input placeholder="Número de causa" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Carátula"
                    name="caratula"
                    rules={[{ required: true, message: 'La carátula es obligatoria' }]}
                >
                    <Input placeholder="Carátula" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Hechos"
                    name="hechos"
                    rules={[{ required: true, message: 'Los hechos son obligatorios' }]}
                >
                    <TextArea placeholder="Ingrese los hechos" rows={3} />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Parte imputada"
                    name="imputado"
                    rules={[{ required: true, message: 'La parte imputada es obligatoria' }]}
                >
                    <Input placeholder="Ingrese el nombre completo del imputado" />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Datos de la parte imputada"
                    name="datos"
                    rules={[{ required: true, message: 'Los datos de la parte imputada son obligatorios' }]}
                >
                    <Input placeholder="Ingrese los datos de la parte imputada (DNI, fecha de nac, defensa, etc)" />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Tiempo de SPP"
                    name="tiempo"
                    rules={[
                        {
                            required: true,
                            message: 'El tiempo de la SPP es obligatorio',
                        },
                        {
                            validator: validateTiempo,
                        },
                    ]}
                >
                    <Input placeholder="Ingrese tiempo de la SPP en el siguiente formato: seis (6) meses" />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Pautas de SPP"
                    name="pautas"
                    rules={[{ required: true, message: 'Las Pautas son obligatorias' }]}
                >
                    <Input placeholder="Ingrese las pautas, con la numeración correspondiente" />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button
                            className="form-button"
                            type="primary"
                            onClick={handlePreview}
                            disabled={!isFormValid || isSubmitting || isLoadingTemplate}
                            size="large"
                        >
                            {isSubmitting || isLoadingTemplate ? '...' : 'Preview'}
                        </Button>
                        <Button
                            onClick={onSubmit}
                            className="form-button"
                            type="primary"
                            htmlType="submit"
                            disabled={!isFormValid || isSubmitting || isLoadingTemplate}
                            size='large'
                        >
                            {isSubmitting || isLoadingTemplate ? '...' : 'Enviar'}
                        </Button>
                    </Space>
                </Form.Item>
                <DocumentPreview
                    fileContent={previewContent}
                    isOpen={isPreviewOpen}
                    onClose={handleClosePreview}
                />
            </Form>
        </>
    );
};

export default Contravencional;