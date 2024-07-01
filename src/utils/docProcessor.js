import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';


export const fillWordTemplateForFATSA = async (formData, templateName) => {
    console.log(templateName)
    try {
        const templateUrls = {
            'FATSA-107': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/FATSA-107.docx?alt=media&token=a4514273-015b-4af0-8459-6268ad4c41f6',
            'FATSA-122': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/FATSA-122.docx?alt=media&token=23307c2e-bc45-4a8a-8031-e7c452664d0f',
            'FATSA-42-89': 'https://firebasestorage.googleapis.com/v0/b/estudio-juridico-9e67c.appspot.com/o/FATSA-42-89.docx?alt=media&token=0a6d4bef-e9f9-490f-8f9f-e26a1d3db80d'
        };

        const templateUrl = templateUrls[templateName];
        const proxyUrl = `/api/proxy-document?url=${encodeURIComponent(templateUrl)}`;
        const response = await fetch(proxyUrl, { responseType: 'arraybuffer' });

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
        let cuit = ''

        if (formData.quienInicia === "ANA MARIA DE LEO, abogada, (Tº 23 Fº 934 C.S.J.N.)") {
            quienAutoriza = "Dra. María Agustina Labourdette";
            cuit = '27-12709974-5'

        } else if (formData.quienInicia === "MARIA AGUSTINA LABOURDETTE, abogada, (Tº 119 Fº 05 C.P.A.C.F.)") {
            quienAutoriza = "Dra. Ana María De Leo";
            cuit = '27-34521458-0'

        }

        // Asegúrate de que todos los campos esperados estén presentes
        const dataToRender = {
            quienInicia: formData.quienInicia || '',
            localidad: formData.localidad || '',
            nombreDemandado: formData.nombreDemandado || '',
            domicilioDemandado: formData.domicilioDemandado || '',
            monto: formData.monto || '',
            numeroActaInspeccion: formData.numeroActaInspeccion.join(', ') || '',
            tieneMultiplesActas: formData.numeroActaInspeccion.length > 1,
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
        console.error('Error en fillWordTemplate:', error);
        throw error;
    }
};


export const fillWordTemplate = async (formData, templateUrl) => {
    try {
        const proxyUrl = `/api/proxy-document?url=${encodeURIComponent(templateUrl)}`;
        const response = await fetch(proxyUrl, { responseType: 'arraybuffer' });
        if (!response.ok) {
          throw new Error(`Error al descargar la plantilla: ${response.status} - ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          throw new Error('El archivo descargado no es un archivo .docx válido');
        }
        const templateArrayBuffer = await response.arrayBuffer();

        
        const zip = new PizZip(templateArrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Determine quienAutoriza based on quienInicia
        let quienAutoriza = '';
        let cuit = ''

        if (formData.quienInicia === "ANA MARIA DE LEO, abogada, (Tº 23 Fº 934 C.S.J.N.)") {
            quienAutoriza = "Dra. María Agustina Labourdette";
            cuit = '27-12709974-5'

        } else if (formData.quienInicia === "MARIA AGUSTINA LABOURDETTE, abogada, (Tº 135 Fº 333 C.S.J.N.)") {
            quienAutoriza = "Dra. Ana María De Leo";
            cuit = '27-34521458-0'

        }


        // Asegúrate de que todos los campos esperados estén presentes
        const dataToRender = {
            quienInicia: formData.quienInicia || '',
            localidad: formData.localidad || '',
            nombreDemandado: formData.nombreDemandado || '',
            domicilioDemandado: formData.domicilioDemandado || '',
            monto: formData.monto || '',
            numeroActaInspeccion: formData.numeroActaInspeccion.join(', '),
            tieneMultiplesActas: formData.numeroActaInspeccion.length > 1,
            periodos: formData.periodos || '',
            numeroResolucion: formData.numeroResolucion || '',
            fechaResolucion: formData.fechaResolucion || '',
            personaContraria: quienAutoriza,
            cuit: cuit

        };
        doc.render(dataToRender);

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); console.log('Número de Acta de Inspección:', dataToRender.numeroActaInspeccion);
        console.log(dataToRender.tieneMultiplesActas)
        return out;
    } catch (error) {
        console.error('Error en fillWordTemplate:', error);
        throw error;
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