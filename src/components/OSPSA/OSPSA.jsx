import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, handleSubmit, generatePreview } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import QuienInicia from '../Form/Modulos-Reutilizables/QuienInicia';
import LocalidadField from '../Form/Modulos-Reutilizables/LocalidadField';
import DemandadoField from '../Form/Modulos-Reutilizables/DemandadoField';
import MontoField from '../Form/Modulos-Reutilizables/MontoField';
import ActaInspeccionField from '../Form/Modulos-Reutilizables/ActaInspeccionField';
import PeriodosField from '../Form/Modulos-Reutilizables/PeriodosField';
import ResolucionField from '../Form/Modulos-Reutilizables/ResolucionField';
import BackButton from '../BackButton';
import { Card, Typography, Space, Affix } from 'antd';
import { NumerosALetras } from 'numero-a-letras';
import moment from 'moment/moment';


const { Title } = Typography;

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

const OSPSA = ({ onBack }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);
    const tipoResolucion = useSelector((state) => state.form.tipoResolucion);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['quienInicia', 'localidad', 'nombreDemandado', 'domicilioDemandado', 'monto', 'numeroActaInspeccion', 'periodos', 'numeroResolucion', 'fechaResolucion'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            monto: formatMonto(values.monto),
            periodos: formatPeriodos(values.periodos),
            fechaResolucion: values.fechaResolucion ? moment(values.fechaResolucion).format('DD/MM/YYYY') : '',
        };
        dispatch(handleSubmit(formattedValues));
    };

    const onPreview = async (values) => {
        try {
            const formattedValues = {
                ...values,
                monto: formatMonto(values.monto),
                periodos: formatPeriodos(values.periodos),
                fechaResolucion: values.fechaResolucion ? moment(values.fechaResolucion).format('DD/MM/YYYY') : '',
            };
            const previewContent = await dispatch(generatePreview(formattedValues)).unwrap();
            return previewContent;
        } catch (error) {
            console.error('Error al generar la vista previa:', error);
            return '<p>Error al generar la vista previa</p>';
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Affix>
                    <BackButton onClick={onBack} />
                </Affix>
                <Card
                    style={{
                        maxWidth: 800,
                        margin: '0 auto',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                    hoverable
                >
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                        Formulario OSPSA
                    </Title>
                    <BaseForm
                        tipoResolucion={tipoResolucion}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                        onPreview={onPreview}
                        isFormValid={isFormValid}
                        isSubmitting={isSubmitting}
                        isLoadingTemplate={isLoadingTemplate}
                    >
                        <QuienInicia />
                        <LocalidadField />
                        <DemandadoField />
                        <MontoField />
                        <ActaInspeccionField />
                        <PeriodosField />
                        <ResolucionField />
                    </BaseForm>
                </Card>
            </Space>
        </div>
    );
};

export default OSPSA;