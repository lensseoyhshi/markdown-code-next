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
import { usePageLoading } from '../hooks/usePageLoading';
import { marked } from 'marked';

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
    const [outputFileName, setOutputFileName] = useState('');

    // 处理文件选择
    const handleFileSelected = (file: RcFile) => {
        // 添加文件类型校验
        if (!file.name.toLowerCase().endsWith('.md')) {
            messageApi.error('仅支持Markdown文件');
            return false;  // 阻止文件选择
        }
        setUploadedFile(file);
        setOutputFilePath('');
        setError(null);
        setCurrentStep(0);
        return false; // Ant Design Upload需要返回boolean
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
            messageApi.error('请选择Markdown文件');
            return;
        }

        setIsUploading(true);
        setIsProcessing(true);
        setProcessingProgress(0);
        setError(null);
        setCurrentStep(1);

        // 创建进度模拟器
        const progressInterval = simulateProgress();

        try {
            // 读取文件内容
            const reader = new FileReader();
            reader.onload = async (e) => {
                const markdownContent = e.target?.result as string;

                // 使用marked转换markdown
                const htmlContent = marked.parse(markdownContent) as string;

                // 生成下载文件名（保持与上传文件名一致，只改扩展名）
                const originalName = uploadedFile.name;
                const fileName = originalName.replace(/\.md$/i, '.html');

                setOutputFileName(fileName);

                // 创建可下载的Blob
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);

                // 更新状态
                setOutputFilePath(url);
                setProcessingProgress(100);
                clearInterval(progressInterval); // 清除进度模拟器
                messageApi.success('转换完成！');
                setIsProcessing(false);
                setCurrentStep(2);
            };

            reader.readAsText(uploadedFile);

        } catch (error) {
            console.warn('转换错误:', error);
            setError(error instanceof Error ? error : new Error('转换失败'));
            messageApi.error(`转换失败: ${error instanceof Error ? error.message : '请重试'}`);
            setIsProcessing(false);
            clearInterval(progressInterval); // 确保错误时也清除进度模拟器
        } finally {
            setIsUploading(false);
        }
    };


    // 处理文件下载
    const handleDownload = async () => {
        if (!outputFilePath || !outputFileName) {
            messageApi.error('没有可下载的文件');
            return;
        }

        try {
            // 直接使用Blob URL下载
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = outputFilePath;
            a.download = outputFileName; // 使用设置的输出文件名
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            messageApi.success(`文件"${outputFileName}"下载成功`);
        } catch (error) {
            console.error('下载错误:', error);
            messageApi.error('下载失败，请重试');
        }
    };

    // 重置状态
    const resetState = () => {
        // 清除所有状态
        setUploadedFile(null);
        setOutputFilePath('');
        setOutputFileName('');  // 清除输出文件名
        setProcessingProgress(0);
        setIsProcessing(false);
        setError(null);
        setCurrentStep(0);

        // 更改key值，强制FileUploader组件重新渲染，清空已选文件
        setUploaderKey(prev => prev + 1);

        // 显示提示消息
        messageApi.success('已重置，请选择新文件');
    };

    // 重试上传
    const handleRetry = () => {
        setError(null);
        if (uploadedFile) {
            handleUpload();
        }
    };

    const isLoading = usePageLoading();
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <article className="container mx-auto p-4 max-w-3xl opacity-0 animate-fade-in">
            {contextHolder}

            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    <FileMarkdownOutlined className="mr-2" />
                    Markdown to HTML Converter
                </h1>
                <p className="text-gray-600">
                    Upload Markdown files and convert to HTML format
                </p>
            </header>

            <section aria-label="conversion-process" className="space-y-6">
                <nav aria-label="progress-navigation">
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
                </nav>

                <section aria-label="file-upload" className="mb-6">
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
                </section>

                {/* Processing Progress Section */}
                {isProcessing && (
                    <section aria-label="processing-status">
                        <ProcessingProgress
                            progress={processingProgress}
                            fileName={uploadedFile?.name || ''}
                            isProcessing={isUploading}
                        />
                    </section>
                )}

                {/* Result Section */}
                {outputFilePath && !isProcessing && (
                    <section aria-label="conversion-result">
                        <ConversionResult
                            filePath={outputFilePath}
                            fileName={outputFileName} // 传递文件名到结果组件
                            onDownload={handleDownload}
                        />
                    </section>
                )}

                {/* Reset Section */}
                {(outputFilePath || error) && !isProcessing && (
                    <footer className="flex justify-center mt-6">
                        <Button onClick={resetState}>Start Over</Button>
                    </footer>
                )}
            </section>
        </article>
    );
}
