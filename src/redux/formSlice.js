import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/* import obtenerUrlDescarga from '../firebase/firestore'; */
import { fillWordTemplate, downloadBlob, fillWordTemplateForFATSA } from '../utils/docProcessor';
import { renderAsync } from 'docx-preview';


export const handleSubmit = createAsyncThunk(
    'form/handleSubmit',
    async (values, { dispatch, getState }) => {
        dispatch(setSubmitting(true));
        try {
            const tipoResolucion = getState().form.tipoResolucion;
            if (!tipoResolucion) {
                throw new Error('El tipo de resolución no está definido');
            }
            dispatch(setLoadingTemplate(true));
            console.log('Valores antes de fillWordTemplate:', values);
            const modifiedDocument = await fillWordTemplate(values, tipoResolucion);
            downloadBlob(modifiedDocument, `${tipoResolucion}_modificado.docx`);
            return 'El formulario se ha enviado correctamente';
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Ha ocurrido un error al enviar el formulario');
        } finally {
            dispatch(setSubmitting(false));
            dispatch(setLoadingTemplate(false));
        }
    }
);

export const generatePreview = createAsyncThunk(
    'form/generatePreview',
    async (values, { dispatch, getState }) => {
        dispatch(setSubmitting(true));
        try {
            const tipoResolucion = getState().form.tipoResolucion;
            if (!tipoResolucion) {
                throw new Error('El tipo de resolución no está definido');
            }
            dispatch(setLoadingTemplate(true));
            const modifiedDocument = await fillWordTemplate(values, tipoResolucion);
            
            const previewContainer = document.createElement('div');
            await renderAsync(modifiedDocument, previewContainer);
            const previewHtml = previewContainer.innerHTML;
            
            return previewHtml;
        } catch (error) {
            console.error('Error en generatePreview:', error);
            throw new Error('Ha ocurrido un error al generar la previsualización');
        } finally {
            dispatch(setSubmitting(false));
            dispatch(setLoadingTemplate(false));
        }
    }
);
export const handleSubmitForFATSA = createAsyncThunk(
    'form/handleSubmitForFATSA',
    async (values, { dispatch }) => {
        dispatch(setSubmitting(true));
        try {
            const templateName = values.tipoDemanda;
            dispatch(setLoadingTemplate(true));
            const modifiedDocument = await fillWordTemplateForFATSA(values, templateName);
            downloadBlob(modifiedDocument, `${templateName}_modificado.docx`);
            return 'El formulario se ha enviado correctamente';
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Ha ocurrido un error al enviar el formulario');
        } finally {
            dispatch(setSubmitting(false));
        }
    }
);

export const generatePreviewForFATSA = createAsyncThunk(
    'form/generatePreviewForFATSA',
    async (values, { dispatch }) => {
        dispatch(setSubmitting(true));
        try {
            const templateName = values.tipoDemanda;
            dispatch(setLoadingTemplate(true));
            const modifiedDocument = await fillWordTemplateForFATSA(values, templateName);
            
            const previewContainer = document.createElement('div');
            await renderAsync(modifiedDocument, previewContainer);
            const previewHtml = previewContainer.innerHTML;
            console.log(values);
            dispatch(setLoadingTemplate(false));
            return previewHtml;
        } catch (error) {
            console.error('Error en generatePreviewForFATSA:', error);
            throw new Error('Ha ocurrido un error al generar la previsualización');
        } finally {
            dispatch(setSubmitting(false));
        }
    }
);


const formSlice = createSlice({
    name: 'form',
    initialState: {
        isFormValid: false,
        isSubmitting: false,
        isLoadingTemplate: false,
        draftData: null,
        tipoResolucion: '',
    },
    reducers: {
        setFormValidity: (state, action) => {
            state.isFormValid = action.payload;
        },
        setSubmitting: (state, action) => {
            state.isSubmitting = action.payload;
        },
        setLoadingTemplate: (state, action) => {
            state.isLoadingTemplate = action.payload;
        },
        setTipoResolucion: (state, action) => {
            console.log('Reducer: Setting tipoResolucion to:', action.payload);
            state.tipoResolucion = action.payload;
        },
        setPreviewUrl: (state, action) => {
            state.previewBlob = action.payload;
        },
    },
});

export const { setFormValidity, setSubmitting, setLoadingTemplate, setTipoResolucion, setPreviewBlob } = formSlice.actions;

export default formSlice.reducer;