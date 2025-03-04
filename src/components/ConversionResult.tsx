// src/components/ConversionResult.tsx
import React, { useState } from 'react';
import { Card, Button, Typography, Alert, Divider, Collapse, Spin } from 'antd';
import { DownloadOutlined, CheckCircleFilled, CopyOutlined, FileFilled } from '@ant-design/icons';
import { extractFileName } from '@/utils/file';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface ConversionResultProps {
    filePath: string;
    onDownload: () => void;
    isLoading?: boolean;
}

/**
 * Conversion Result Component
 * Display conversion completion information and provide download functionality
 */
const ConversionResult: React.FC<ConversionResultProps> = ({
    filePath,
    onDownload,
    isLoading = false,
}) => {
    const [copied, setCopied] = useState(false);
    const fileName = extractFileName(filePath);

    const copyFilePath = () => {
        navigator.clipboard.writeText(filePath);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <Card>
                <div className="flex justify-center items-center p-8">
                    <Spin size="large" tip="Loading file information..." />
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="mb-4 flex items-center">
                <CheckCircleFilled style={{ color: '#52c41a', fontSize: 24 }} className="mr-3" />
                <Title level={4} className="m-0">Conversion Complete</Title>
            </div>

            <Alert
                message="Success"
                description="Your Markdown file has been successfully converted to HTML format. Click the button below to download."
                type="success"
                showIcon
                className="mb-4"
            />

            <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <FileFilled className="mr-2 text-blue-500" />
                        <Text strong>{fileName}</Text>
                    </div>
                    <Button
                        type="text"
                        icon={copied ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                        onClick={copyFilePath}
                        size="small"
                    >
                        {copied ? 'Copied' : 'Copy Path'}
                    </Button>
                </div>
            </div>

            <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                onClick={onDownload}
                className="w-full"
            >
                Download HTML File
            </Button>

            <Divider />

            <Collapse ghost>
                <Panel header="File Details" key="1">
                    <Paragraph className="mb-1">
                        <Text strong>File Path: </Text>
                        <Text code>{filePath}</Text>
                    </Paragraph>
                    <Paragraph className="mb-1">
                        <Text strong>Format: </Text>
                        <Text>HTML</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong>Creation Time: </Text>
                        <Text>{new Date().toLocaleString()}</Text>
                    </Paragraph>
                </Panel>
            </Collapse>
        </Card>
    );
};

export default ConversionResult;
