import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, generatePreviewForFATSA, handleSubmitForFATSA } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import QuienInicia from '../Form/Modulos-Reutilizables/QuienInicia';
import PersonasField from '../Form/Modulos-Reutilizables/PersonasField'
import TestigosField from '../Form/Modulos-Reutilizables/TestigosField'
import CuotasField from '../Form/Modulos-Reutilizables/CuotasField'
import DemandadoField from '../Form/Modulos-Reutilizables/DemandadoField';
import MontoField from '../Form/Modulos-Reutilizables/MontoField';
import ActaInspeccionField from '../Form/Modulos-Reutilizables/ActaInspeccionField';
import PeriodosField from '../Form/Modulos-Reutilizables/PeriodosField';
import { Card, Typography, Button, Row, Col, Select, Form } from 'antd';
import { NumerosALetras } from 'numero-a-letras';
import moment from 'moment/moment';
import { LeftOutlined } from '@ant-design/icons';
import './FATSA.css';

const { Title } = Typography;
const { Option } = Select;

const formatPeriodos = (periodos) => {
    if (!periodos || !Array.isArray(periodos)) return '';
    return periodos.map(periodo => {
        const { mesInicio, añoInicio, mesFin, añoFin } = periodo;
        return `${mesInicio} ${añoInicio} a ${mesFin} ${añoFin}`;
    }).join(', ');
};

const formatMonto = (monto) => {
    if (!monto) return '';
    const montoNumber = parseFloat(monto);
    if (isNaN(montoNumber)) return '';

    let montoEnPalabras = NumerosALetras(Math.floor(montoNumber)).toUpperCase();
    montoEnPalabras = montoEnPalabras.replace(' DE ', ' ');
    montoEnPalabras = montoEnPalabras
        .replace(/\s+PESOS(\s+00\/100)?(\s+M\.N\.)?$/i, '')
        .trim();

    const montoFormateado = montoNumber.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return `PESOS ${montoEnPalabras} ($ ${montoFormateado})`;
};

const FATSA = ({ onBack }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    const [subTipoDemanda, setSubTipoDemanda] = useState('');
    const [localFormValidity, setLocalFormValidity] = useState(false);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['quienInicia', 'nombreDemandado', 'domicilioDemandado', 'monto', 'numeroActaInspeccion', 'periodos', 'numeroResolucion', 'fechaResolucion'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        setLocalFormValidity(isValid && subTipoDemanda !== '');
    };
    useEffect(() => {
        console.log('FATSA component state:', { isFormValid, isSubmitting, isLoadingTemplate });
    }, [isFormValid, isSubmitting, isLoadingTemplate]);

    useEffect(() => {
        dispatch(setFormValidity(localFormValidity));
    }, [localFormValidity, dispatch]);

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            monto: formatMonto(values.monto),
            periodos: formatPeriodos(values.periodos),
            tipoDemanda: `FATSA-${subTipoDemanda}`,
            numeroActaInspeccion: values.numeroActaInspeccion ? values.numeroActaInspeccion.map(acta => acta.numero) : [],
            personas: values.personas,
            testigos: values.testigos
            ? values.testigos
                .split('\n')
                .filter(testigo => testigo.trim() !== '')
                .map((testigo, index) => `${index + 1}.- ${testigo.trim()}`)
                .join(', ')
            : '',
            cuotas: values.cuotas,
        };
        dispatch(handleSubmitForFATSA(formattedValues));
    };
    const onPreview = async (values) => {
        try {
            const formattedValues = {
                ...values,
                monto: formatMonto(values.monto),
                periodos: formatPeriodos(values.periodos),
                tipoDemanda: `FATSA-${subTipoDemanda}`,
                numeroActaInspeccion: values.numeroActaInspeccion ? values.numeroActaInspeccion.map(acta => acta.numero) : [],
                personas: values.personas,
                testigos: values.testigos
                ? values.testigos
                    .split('\n')
                    .filter(testigo => testigo.trim() !== '')
                    .map((testigo, index) => `${index + 1}.- ${testigo.trim()}`)
                    .join(', ')
                : '',
                cuotas: values.cuotas,
            };
            const previewContent = await dispatch(generatePreviewForFATSA(formattedValues)).unwrap();
            return previewContent;
        } catch (error) {
            console.error('Error al generar la vista previa:', error);
            return '<p>Error al generar la vista previa</p>';
        }
    };
    return (
        <div className="ospsa-container">
            <Card className="ospsa-card">
                <Button
                    icon={<LeftOutlined />}
                    onClick={onBack}
                    type="link"
                    className="back-button"
                >
                    Volver
                </Button>
                <Title level={3} className="ospsa-title">
                    FATSA
                </Title>
                <Select
                    style={{ width: '100%', marginBottom: '16px' }}
                    placeholder="Seleccione el subtipo de demanda FATSA"
                    onChange={(value) => {
                        setSubTipoDemanda(value);
                        setLocalFormValidity(prevState => prevState && value !== '');
                    }}
                >
                    <Option value="42-89">CCT 42/89 - Laboratorios</Option>
                    <Option value="107">CCT 107/75 - Mutualidades</Option>
                    <Option value="122">CCT 122/75 - Geriátricos</Option>
                </Select>
                <BaseForm
                    onFieldsChange={onFieldsChange}
                    onFinish={onFinish}
                    onPreview={onPreview}
                    isSubmitting={isSubmitting}
                    isLoadingTemplate={isLoadingTemplate}
                >
                    <Row gutter={[24, 16]}>
                        <Col xs={24} md={12}>
                            <QuienInicia />
                            <MontoField />
                        </Col>
                        <Col xs={24} md={12}>
                            <DemandadoField />
                        </Col>
                    </Row>
                    <Form.Item label="Actas de Inspección">
                        <ActaInspeccionField />
                    </Form.Item>
                    <PeriodosField />
                    <CuotasField />
                    <PersonasField />
                    <TestigosField />
                </BaseForm>
            </Card>
        </div>
    );
};

export default FATSA;