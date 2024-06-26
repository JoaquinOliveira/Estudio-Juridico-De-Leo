import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export const fillWordTemplate = async (formData, templateUrl) => {
    try {
        const proxyUrl = `http://localhost:3001/proxy-document?url=${encodeURIComponent(templateUrl)}`;
        const response = await fetch(proxyUrl, { responseType: 'arraybuffer' });
        const templateArrayBuffer = await response.arrayBuffer();

        const zip = new PizZip(templateArrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Asegúrate de que todos los campos esperados estén presentes
        const dataToRender = {
            quienInicia: formData.quienInicia || '',
            localidad: formData.localidad || '',
            nombreDemandado: formData.nombreDemandado || '',
            domicilioDemandado: formData.domicilioDemandado || '',
            monto: formData.monto || '',
            numeroActaInspeccion: formData.numeroActaInspeccion || '',
            periodos: formData.periodos || '',
            numeroResolucion: formData.numeroResolucion || '',
            fechaResolucion: formData.fechaResolucion || '',
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

export const downloadBlob = (blob, filename) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};