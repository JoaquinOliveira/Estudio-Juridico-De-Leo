import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, setSubTipo, } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import FechaField from '../Form/Modulos-Reutilizables/FechaField';
import CausaField from '../Form/Modulos-Reutilizables/CausaField';
import CaratulaField from '../Form/Modulos-Reutilizables/CaratulaField';
import HechosField from '../Form/Modulos-Reutilizables/HechosField';
import ImputadoField from '../Form/Modulos-Reutilizables/ImputadoField';
import DelitoField from '../Form/Modulos-Reutilizables/DelitoField';


const ExtincionPenal = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'imputado', 'delito'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };

    return (
        <BaseForm
            subTipo={subTipo}
            onFieldsChange={onFieldsChange}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            isLoadingTemplate={isLoadingTemplate}
            formTitle="Formulario de Extinción Penal"
        >
            <FechaField />
            <CausaField />
            <CaratulaField />
            <HechosField rows={3} />
            <ImputadoField />
            <DelitoField />
        </BaseForm>
    );
};

export default ExtincionPenal;