import React from 'react';
import { Modal } from 'antd';

const DocumentPreview = ({ fileContent, isOpen, onClose }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            onOk={onClose}
            width={800}
            title="Vista previa del documento"
            footer={null}
        >
            <div
                dangerouslySetInnerHTML={{ __html: fileContent }}
                style={{ maxHeight: '70vh', overflowY: 'auto' }}
            />
        </Modal>
    );
};

export default DocumentPreview;