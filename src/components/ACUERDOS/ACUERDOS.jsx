import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, generatePreviewForFATSA, handleSubmitForFATSA } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import QuienAcuerda from '../Form/Modulos-Reutilizables/QuienAcuerda';
import CuotasField from '../Form/Modulos-Reutilizables/CuotasField'
import DemandadoField from '../Form/Modulos-Reutilizables/DemandadoField';
import MontoField from '../Form/Modulos-Reutilizables/MontoField';
import Apoderada from '../Form/Modulos-Reutilizables/ApoderadaField';
import PeriodosField from '../Form/Modulos-Reutilizables/PeriodosField';
import VenceField from '../Form/Modulos-Reutilizables/VenceField'
import { Card, Typography, Button, Select, Form } from 'antd';
import { NumerosALetras } from 'numero-a-letras';
import { LeftOutlined } from '@ant-design/icons';
import './ACUERDOS.css';

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

const ACUERDOS = ({ onBack }) => {
    const dispatch = useDispatch();

    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    const [subTipoDemanda, setSubTipoDemanda] = useState('');
    const [localFormValidity, setLocalFormValidity] = useState(false);

    const formatFecha = () => {
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const año = fecha.getFullYear();
        return `al día ${dia} del mes de ${mes} de ${año}`;
    };
    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['quienAcuerda', 'apoderada', 'nombreDemandado', 'domicilioDemandado', 'monto', 'periodos'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        setLocalFormValidity(isValid && subTipoDemanda !== '');
    };

    useEffect(() => {
        dispatch(setFormValidity(localFormValidity));
    }, [localFormValidity, dispatch]);

    const onFinish = (values) => {
        console.log(values.vence)
        const formattedValues = {
            ...values,
            fecha: formatFecha(),
            monto: formatMonto(values.monto),
            periodos: formatPeriodos(values.periodos),
            tipoDemanda: subTipoDemanda,
            cuotas: values.cuotas
                ? `${values.cuotas} (${NumerosALetras(values.cuotas).toUpperCase()})`
                : '',
        };
        dispatch(handleSubmitForFATSA(formattedValues));
    };
    const onPreview = async (values) => {
        console.log(values.vence)
        try {
            const formatCuotas = (cuotasValue) => {
                if (!cuotasValue) return '';
                const num = parseInt(cuotasValue, 10);
                if (isNaN(num)) return '';
                let letras = "";
                // Si es 1, usamos "UNA" en vez de lo que devuelva NumerosALetras
                if (num === 1) {
                    letras = "UNA";
                } else {
                    letras = NumerosALetras(num)
                        .toUpperCase()
                        .replace(/\s+PESOS/gi, '')
                        .replace(/\s*00\/100 M\.N\./gi, '')
                        .trim();
                }
                const textoCuota = num === 1 ? 'cuota' : 'cuotas';
                return `${num} (${letras}) ${textoCuota}`;
            };
            const formattedValues = {
                ...values,
                fecha: formatFecha(),
                monto: formatMonto(values.monto),
                periodos: formatPeriodos(values.periodos),
                tipoDemanda: subTipoDemanda,
                cuotas: formatCuotas(values.cuotas),
                vence: values.vence,
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
                    CONVENIOS
                </Title>
                <Select
                    style={{ width: '100%', marginBottom: '16px' }}
                    placeholder="Seleccione el subtipo de convenio"
                    onChange={(value) => {
                        setSubTipoDemanda(value);
                        setLocalFormValidity(prevState => prevState && value !== '');
                    }}
                >
                    <Option value="aportesconvenio">OSPSA - Aportes y Contribuciones</Option>
                    <Option value="108">FATSA - Aportes convencionales y C. Extraordinarias 108/75</Option>
                    <Option value="108 cuota soli">FATSA - Cuota Solidaridad 108/75</Option>
                    <Option value="122">FATSA - Cuota Solidaridad 122/75</Option>
                    <Option value="122ce">FATSA - Cuota Solidaridad + C. Extraordinarias 122/75</Option>

                </Select>
                <BaseForm
                    onFieldsChange={onFieldsChange}
                    onFinish={onFinish}
                    onPreview={onPreview}
                    isSubmitting={isSubmitting}
                    isLoadingTemplate={isLoadingTemplate}
                >
                    <QuienAcuerda />
                    <Apoderada />
                    <DemandadoField />
                    <MontoField />
                    <PeriodosField />
                    <CuotasField />
                    <Form.Item
                        label="Fecha de vencimiento"
                        name="vence"
                        rules={[{ required: true, message: 'Por favor, ingrese la fecha de vencimiento' }]}
                    >
                        <VenceField />
                    </Form.Item>
                </BaseForm>
            </Card>
        </div>
    );
};

export default ACUERDOS;