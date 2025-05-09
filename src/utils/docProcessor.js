import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const templateUrls = {
    'FATSA-107': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/FATSA-107.docx?alt=media&token=a4514273-015b-4af0-8459-6268ad4c41f6',
    'FATSA-122': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/FATSA-122.docx?alt=media&token=23307c2e-bc45-4a8a-8031-e7c452664d0f',
    'FATSA-42-89': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/FATSA-42-89.docx?alt=media&token=0a6d4bef-e9f9-490f-8f9f-e26a1d3db80d',
    'OSPSA': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/OSPSA.docx?alt=media&token=5f59ee8f-a016-44bb-bdd8-aae6d03b5892',
    'aportesconvenio': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/aportesconvenio.docx?alt=media&token=672106ff-cc8d-43dd-ba24-216e754a8ce7',
};

export const fillWordTemplateForFATSA = async (formData, templateName) => {

    try {
        const templateUrl = templateUrls[templateName];
        if (!templateUrl) {
            throw new Error(`Template not found for ${templateName}`);
        }

        const response = await fetch(templateUrl);
        if (!response.ok) {
            throw new Error(`Error al descargar la plantilla: ${response.status} - ${response.statusText}`);
        }

        const templateArrayBuffer = await response.arrayBuffer();

        const zip = new PizZip(templateArrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        let quienAutoriza = '';
        let cuit = '';

        if (formData.quienInicia === "ANA MARIA DE LEO, abogada, (Tº 23 Fº 934 C.S.J.N.)") {
            quienAutoriza = "Dra. María Agustina Labourdette";
            cuit = '27-12709974-5';
        } else if (formData.quienInicia === "MARIA AGUSTINA LABOURDETTE, abogada, (Tº 119 Fº 05 C.P.A.C.F.)") {
            quienAutoriza = "Dra. Ana María De Leo";
            cuit = '27-34521458-0';
        }
        console.log(cuit)
        console.log(quienAutoriza)
        

        const dataToRender = {
            vence: formData.vence,
            apoderada: formData.apoderada,
            fecha: formData.fecha || '',
            quienInicia: formData.quienInicia || '',
            quienAcuerda: formData.quienAcuerda || '',
            localidad: formData.localidad || '',
            nombreDemandado: formData.nombreDemandado || '',
            domicilioDemandado: formData.domicilioDemandado || '',
            monto: formData.monto || '',
            numeroActaInspeccion: formData.numeroActaInspeccion ? formData.numeroActaInspeccion.join(', ') : '',
            tieneMultiplesActas: formData.numeroActaInspeccion ? formData.numeroActaInspeccion.length > 1 : false,
            periodos: formData.periodos || '',
            numeroResolucion: formData.numeroResolucion || '',
            fechaResolucion: formData.fechaResolucion || '',
            personaContraria: quienAutoriza,
            cuit: cuit,
            personas: formData.personas,
            testigos: formData.testigos,
            tieneMuchasCuotas: formData.cuotas ? formData.cuotas.length > 1 : false,
            cuotas: formData.cuotas,
        };

        doc.render(dataToRender);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        return out;
    } catch (error) {
        console.error('Error en fillWordTemplateForFATSA:', error);
        throw error;
    }
};
export const fillWordTemplate = async (formData, templateName) => {
    try {
        console.log(formData)
        const templateUrl = templateUrls[templateName];
        if (!templateUrl) {
            throw new Error(`Template not found for ${templateName}`);
        }

        const response = await fetch(templateUrl);
        if (!response.ok) {
            throw new Error(`Error al descargar la plantilla: ${response.status} - ${response.statusText}`);
        }

        const templateArrayBuffer = await response.arrayBuffer();

        const zip = new PizZip(templateArrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        let quienAutoriza = '';
        let cuit = '';

        if (formData.quienInicia === "ANA MARIA DE LEO, abogada, (Tº 23 Fº 934 C.S.J.N.)") {
            quienAutoriza = "Dra. María Agustina Labourdette";
            cuit = '27-12709974-5';
        } else if (formData.quienInicia === "MARIA AGUSTINA LABOURDETTE, abogada, (Tº 119 Fº 05 C.P.A.C.F.)") {
            formData.quienInicia = "MARIA AGUSTINA LABOURDETTE, abogada, (Tº 135 Fº 333 C.F.S.M)";
            quienAutoriza = "Dra. Ana María De Leo";
            cuit = '27-34521458-0';
        }
        console.log(cuit)
        console.log(quienAutoriza)
        
        const dataToRender = {
            apoderada: formData.apoderada,
            fecha: formData.fecha || '',
            quienInicia: formData.quienInicia || '',
            quienAcuerda: formData.quienAcuerda || '',
            localidad: formData.localidad || '',
            nombreDemandado: formData.nombreDemandado || '',
            domicilioDemandado: formData.domicilioDemandado || '',
            monto: formData.monto || '',
            numeroActaInspeccion: formData.numeroActaInspeccion ? formData.numeroActaInspeccion.join(', ') : '',
            tieneMultiplesActas: formData.numeroActaInspeccion ? formData.numeroActaInspeccion.length > 1 : false,
            tieneMuchasCuotas: formData.cuotas ? formData.cuotas.length > 1 : false,
            periodos: formData.periodos || '',
            numeroResolucion: formData.numeroResolucion || '',
            fechaResolucion: formData.fechaResolucion || '',
            personaContraria: quienAutoriza,
            cuit: cuit,
            personas: formData.personas,
            testigos: formData.testigos,
            cuotas: formData.cuotas,
        };


        doc.render(dataToRender);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        return out;
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            throw new Error('El archivo de plantilla no existe en Firebase Storage');
        } else if (error.code === 'storage/unauthorized') {
            throw new Error('No tienes permiso para acceder al archivo de plantilla');
        } else {
            throw error;
        }
    }
};

export const downloadBlob = (blob, filename) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};