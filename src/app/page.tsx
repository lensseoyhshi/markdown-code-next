// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button, Typography, message, Card, Steps, Divider } from 'antd';
import { FileMarkdownOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { downloadFile } from '../services/api';
import { extractFileName } from '../utils/file';
import FileUploader from '../components/FileUploader';
import ProcessingProgress from '../components/ProcessingProgress';
import ConversionResult from '../components/ConversionResult';
import ErrorHandler from '../components/ErrorHandler';

const { Title, Text } = Typography;
const { Step } = Steps;

export default function Home() {
    const [messageApi, contextHolder] = message.useMessage();
    const [isUploading, setIsUploading] = useState(false);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [outputFilePath, setOutputFilePath] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<RcFile | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    // 用于FileUploader组件的key，重置时更改，强制组件重新渲染
    const [uploaderKey, setUploaderKey] = useState<number>(0);

    // 处理文件选择
    const handleFileSelected = (file: RcFile) => {
        setUploadedFile(file);
        setOutputFilePath('');
        setError(null);
        setCurrentStep(0);
    };

    // 模拟进度的函数
    const simulateProgress = () => {
        // 重置进度
        setProcessingProgress(0);

        // 创建一个模拟进度的计时器
        const interval = setInterval(() => {
            setProcessingProgress(prev => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 5;
            });
        }, 200);

        // 返回定时器ID，以便可以清除
        return interval;
    };

    // 处理文件上传
    const handleUpload = async () => {
        if (!uploadedFile) {
            messageApi.error('Please select a Markdown file');
            return;
        }

        setIsUploading(true);
        setIsProcessing(true);
        setProcessingProgress(0);
        setError(null);
        setCurrentStep(1);

        // 开始模拟进度
        const progressInterval = simulateProgress();

        try {
            // 创建FormData对象添加文件
            const formData = new FormData();
            formData.append('file', uploadedFile);

            // 发送上传请求
            const response = await fetch('http://localhost:7860/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Upload Failure');
            }

            const result = await response.json();

            if (result.code === '200') {
                // 清除进度模拟
                clearInterval(progressInterval);

                // 保存输出路径
                setOutputFilePath(result.out_path);

                // 设置进度为100%表示完成
                setProcessingProgress(100);
                messageApi.success('Complete！');
                setIsProcessing(false);
                setCurrentStep(2);
            } else {
                throw new Error(result.detail || 'Failure');
            }
        } catch (error) {
            // 清除进度模拟
            clearInterval(progressInterval);

            console.warn('Upload error:', error);
            setError(error instanceof Error ? error : new Error('Upload failed'));
            messageApi.error(`Upload failed: ${error instanceof Error ? error.message : 'Please try again'}`);
            setIsProcessing(false);
        } finally {
            setIsUploading(false);
        }
    };

    // 处理文件下载
    const handleDownload = async () => {
        if (!outputFilePath) {
            messageApi.error('No file available for download');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:7860/get-file?file_path=${encodeURIComponent(outputFilePath)}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Download failed');
            }

            const blob = await response.blob();

            // 创建下载链接
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // 提取文件名
            const fileName = extractFileName(outputFilePath);
            a.download = fileName;

            document.body.appendChild(a);
            a.click();

            // 清理
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            messageApi.success('File downloaded successfully');
        } catch (error) {
            console.warn('Download error:', error);
            setError(error instanceof Error ? error : new Error('Download failed'));
            messageApi.error(`Download failed: ${error instanceof Error ? error.message : 'Please try again'}`);
        }
    };

    // 重置状态
    const resetState = () => {
        // 清除所有状态
        setUploadedFile(null);
        setOutputFilePath('');
        setProcessingProgress(0);
        setIsProcessing(false);
        setError(null);
        setCurrentStep(0);

        // 更改key值，强制FileUploader组件重新渲染，清空已选文件
        setUploaderKey(prev => prev + 1);

        // 显示提示消息
        messageApi.success('Reset complete, please select a new file');
    };

    // 重试上传
    const handleRetry = () => {
        setError(null);
        if (uploadedFile) {
            handleUpload();
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            {contextHolder}

            <div className="text-center mb-8">
                <Title level={2}>
                    <FileMarkdownOutlined className="mr-2" /> Markdown to HTML Converter
                </Title>
                <Text type="secondary">Upload Markdown files and convert to HTML format</Text>
            </div>

            <Card className="mb-8">
                <Steps
                    current={currentStep}
                    items={[
                        {
                            title: 'Select File',
                            icon: currentStep === 0 ? undefined : undefined,
                        },
                        {
                            title: 'Processing',
                            icon: isProcessing ? <LoadingOutlined /> : undefined,
                        },
                        {
                            title: 'Complete',
                            icon: currentStep === 2 ? <CheckCircleOutlined /> : undefined,
                        },
                    ]}
                />
            </Card>

            <div className="space-y-6">
                <Card
                    title="Select Markdown File"
                    className={currentStep > 0 ? "opacity-60" : ""}
                >
                    <FileUploader
                        key={uploaderKey}
                        onFileSelected={handleFileSelected}
                        disabled={isProcessing || currentStep > 0}
                    />

                    <div className="mt-4">
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleUpload}
                            loading={isUploading}
                            disabled={!uploadedFile || isProcessing || currentStep > 0}
                            className="w-full"
                        >
                            Start Convert
                        </Button>
                    </div>
                </Card>

                {/* 步骤2：处理进度 */}
                {isProcessing && (
                    <ProcessingProgress
                        progress={processingProgress}
                        fileName={uploadedFile?.name || ''}
                        isProcessing = {isUploading}
                    />
                )}

                {/* 步骤3：下载结果 */}
                {outputFilePath && !isProcessing && (
                    <ConversionResult
                        filePath={outputFilePath}
                        onDownload={handleDownload}
                    />
                )}

                {/* 重新开始按钮 */}
                {(outputFilePath || error) && !isProcessing && (
                    <div className="flex justify-center mt-6">
                        <Button onClick={resetState}>Start Over</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
