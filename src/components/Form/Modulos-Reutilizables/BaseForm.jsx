import React from 'react';
import { Form, Button, Space } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import DocumentPreview from '../../../utils/DocumentPreview';

const BaseForm = ({
    tipoResolucion,
    onFieldsChange,
    onFinish,
    onPreview,
    isFormValid,
    isSubmitting,
    isLoadingTemplate,
    children,
    onBack
}) => {
    const [form] = Form.useForm();
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [previewContent, setPreviewContent] = React.useState('');

    const handlePreview = async () => {
        try {
            const values = await form.validateFields();
            const previewContent = await onPreview(values);
            setPreviewContent(previewContent);
            setIsPreviewOpen(true);
        } catch (error) {
            console.error("Error al generar la vista previa:", error);
        }
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
        setPreviewContent('');
    };

    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                onFieldsChange={onFieldsChange}
                layout="vertical"
                requiredMark={false}
            >
                {children}
                <Form.Item>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '40px'  // Aumenta el espacio sobre los botones
                    }}>
                        <Space size="large" style={{ width: '100%', justifyContent: 'space-around' }}>
                            <Button
                                type="default"
                                icon={<EyeOutlined />}
                                onClick={handlePreview}
                            /*     disabled={!isFormValid || isSubmitting || isLoadingTemplate} */
                                size="large"
                                block
                            >
                                Vista Previa
                            </Button>
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                htmlType="submit"
                                /* disabled={!isFormValid || isSubmitting || isLoadingTemplate} */
                                size="large"
                            >
                                Descargar
                            </Button>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
            <DocumentPreview
                fileContent={previewContent}
                isOpen={isPreviewOpen}
                onClose={handleClosePreview}
            />
        </>
    );
};

export default BaseForm;