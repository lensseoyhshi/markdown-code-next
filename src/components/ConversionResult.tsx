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
 * 转换结果展示组件
 * 展示转换完成的文件信息并提供下载功能
 */
const ConversionResult: React.FC<ConversionResultProps> = ({
                                                               filePath,
                                                               onDownload,
                                                               isLoading = false,
                                                           }) => {
    const [copied, setCopied] = useState(false);

    // 提取文件名
    const fileName = extractFileName(filePath);

    // 复制文件路径
    const copyFilePath = () => {
        navigator.clipboard.writeText(filePath);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <Card>
                <div className="flex justify-center items-center p-8">
                    <Spin size="large" tip="正在获取文件信息..." />
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="mb-4 flex items-center">
                <CheckCircleFilled style={{ color: '#52c41a', fontSize: 24 }} className="mr-3" />
                <Title level={4} className="m-0">转换完成</Title>
            </div>

            <Alert
                message="处理成功"
                description="您的Markdown文件已成功转换为HTML格式，可以点击下方按钮下载。"
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
                        {copied ? '已复制' : '复制路径'}
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
                下载HTML文件
            </Button>

            <Divider />

            <Collapse ghost>
                <Panel header="文件详细信息" key="1">
                    <Paragraph className="mb-1">
                        <Text strong>文件路径: </Text>
                        <Text code>{filePath}</Text>
                    </Paragraph>
                    <Paragraph className="mb-1">
                        <Text strong>格式: </Text>
                        <Text>HTML</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong>创建时间: </Text>
                        <Text>{new Date().toLocaleString()}</Text>
                    </Paragraph>
                </Panel>
            </Collapse>
        </Card>
    );
};

export default ConversionResult;
