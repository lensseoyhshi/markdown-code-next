'use client';

// 移除这部分，因为 metadata 需要在服务端处理
// export const metadata = {
//     title: 'Markdown to HTML Converter',
//     description: 'Convert your Markdown files to HTML format online'
// };

// 直接复制 page.tsx 的内容到这个新文件即可
import { useState, useEffect } from 'react';
import { Button, Typography, message, Card, Input } from 'antd';
import { FileMarkdownOutlined, DownloadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { downloadFile } from '../../services/api';
import { extractFileName } from '../../utils/file';
import FileUploader from '../../components/FileUploader';
import ProcessingProgress from '../../components/ProcessingProgress';
import ConversionResult from '../../components/ConversionResult';
import ErrorHandler from '../../components/ErrorHandler';
import { usePageLoading } from '../../hooks/usePageLoading';
import { Progress } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
import { marked } from 'marked';
import { Tabs } from 'antd';
const { Title, Text } = Typography;
// const { Step } = Steps;

export default function Home() {
    const [messageApi, contextHolder] = message.useMessage();
    const [isUploading, setIsUploading] = useState(false);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [outputFilePath, setOutputFilePath] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<RcFile | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [uploaderKey, setUploaderKey] = useState<number>(0);
    const [outputFileName, setOutputFileName] = useState('');
    const [markdownText, setMarkdownText] = useState('');
    const [htmlPreview, setHtmlPreview] = useState('');
    // const [showRawHtml, setShowRawHtml] = useState(false);
    // 处理文件选择
    const handleFileSelected = (file: RcFile) => {
        // 添加文件类型校验
        if (!file.name.toLowerCase().endsWith('.md')) {
            messageApi.error('Only Markdown files are supported');
            return false;  
        }
        setUploadedFile(file);
        setOutputFilePath('');
        setError(null);
        return false;
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
        // setCurrentStep(1);

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
                messageApi.success('Conversion completed!');
                setIsProcessing(false);
                // setCurrentStep(2);
            };

            reader.readAsText(uploadedFile);

        } catch (error) {
            console.warn('Conversion error:', error);
            setError(error instanceof Error ? error : new Error('Conversion failed'));
            messageApi.error(`Conversion failed: ${error instanceof Error ? error.message : 'Please try again'}`);
            setIsProcessing(false);
            clearInterval(progressInterval); // 确保错误时也清除进度模拟器
        } finally {
            setIsUploading(false);
        }
    };


    // 处理文件下载
    const handleDownload = async () => {
        if (!outputFilePath || !outputFileName) {
            messageApi.error('No file available for download');
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

            messageApi.success(`File "${outputFileName}" downloaded successfully`);
        } catch (error) {
            console.error('Download error:', error);
            messageApi.error('Download failed, please try again');
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
        // setCurrentStep(0);

        // 更改key值，强制FileUploader组件重新渲染，清空已选文件
        setUploaderKey(prev => prev + 1);

        // 显示提示消息
        messageApi.success('Reset completed, please select a new file');
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
    // 处理 Markdown 文本变化
    const handleMarkdownChange = async (value: string) => {
        setMarkdownText(value);
        try {
            // 使用 marked.parse 并等待结果
            const convertedHtml = await Promise.resolve(marked.parse(value || ''));
            // 确保结果是字符串类型
            setHtmlPreview(typeof convertedHtml === 'string' ? convertedHtml : '');
        } catch (error) {
            console.error('Markdown conversion error:', error);
            messageApi.error('Conversion failed, please check your Markdown syntax');
        }
    };

    return (
        <article className="container mx-auto p-4 max-w-6xl opacity-0 animate-fade-in">
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
                <section aria-label="file-upload" className="mb-6">
                    <Card>
                        <div className="space-y-4">
                            <FileUploader
                                key={uploaderKey}
                                onFileSelected={handleFileSelected}
                                disabled={isProcessing}
                            />

                            {uploadedFile && !isProcessing && !outputFilePath && (
                                <div className="flex gap-2">
                                    <Button
                                        type="primary"
                                        onClick={handleUpload}
                                        loading={isUploading}
                                        disabled={isProcessing}
                                        className="flex-1"
                                        style={{ backgroundColor: '#1677ff', color: 'white', borderColor: '#1677ff' }}
                                    >
                                        Start Convert
                                    </Button>
                                    {/* <Button 
                                        onClick={resetState}
                                        className="flex-none"
                                        style={{ backgroundColor: '#1677ff', color: 'white', borderColor: '#1677ff' }}
                                    >
                                        Reset
                                    </Button> */}
                                </div>
                            )}

                            {isProcessing && (
                                <div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        Processing: {uploadedFile?.name}
                                    </div>
                                    <Progress percent={processingProgress} status="active" />
                                </div>
                            )}

                            {outputFilePath && (
                                <Button
                                    type="primary"
                                    onClick={handleDownload}
                                    className="w-full"
                                    style={{ backgroundColor: '#1677ff', color: 'white', borderColor: '#1677ff' }}
                                    icon={<DownloadOutlined />}
                                >
                                    Download HTML
                                </Button>
                            )}
                        </div>
                    </Card>
                </section>

                {/* 实时预览部分 */}
                <section className="mt-8">
                    <Card>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Tabs
                                    items={[
                                        {
                                            key: 'input',
                                            label: 'Input Markdown',
                                            children: (
                                                <Input.TextArea
                                                    value={markdownText}
                                                    onChange={(e) => handleMarkdownChange(e.target?.value as string)}
                                                    placeholder="Enter Markdown text here..."
                                                    className="min-h-[600px] font-mono resize-none"
                                                    style={{ height: '600px', overflowY: 'auto' }}
                                                />
                                            )
                                        },
                                        // {
                                        //     key: 'preview',
                                        //     label: 'Preview',
                                        //     children: (
                                        //         <div 
                                        //             className="border p-4 rounded min-h-[600px] overflow-auto bg-gray-50 prose prose-slate max-w-none"
                                        //             style={{ height: '600px' }}
                                        //             dangerouslySetInnerHTML={{ __html: htmlPreview }}
                                        //         />
                                        //     )
                                        // // },
                                        // {
                                        //     key: 'raw',
                                        //     label: 'Raw HTML',
                                        //     children: (
                                        //         <pre 
                                        //             className="border p-4 rounded min-h-[600px] overflow-auto bg-gray-50 text-sm"
                                        //             style={{ height: '600px' }}
                                        //         >
                                        //             {htmlPreview}
                                        //         </pre>
                                        //     )
                                        // }
                                    ]}
                                />
                            </div>
                            <div>
                                <Tabs
                                    defaultActiveKey="raw"
                                    items={[
                                        {
                                            key: 'preview',
                                            label: 'Preview',
                                            children: (
                                                <div 
                                                    className="border p-4 rounded min-h-[600px] overflow-auto bg-gray-50 prose prose-slate max-w-none"
                                                    style={{ height: '600px' }}
                                                    dangerouslySetInnerHTML={{ __html: htmlPreview }}
                                                />
                                            )
                                        },
                                        {
                                            key: 'raw',
                                            label: 'Raw HTML',
                                            children: (
                                                <pre 
                                                    className="border p-4 rounded min-h-[600px] overflow-auto bg-gray-50 text-sm"
                                                    style={{ height: '600px' }}
                                                >
                                                    {htmlPreview}
                                                </pre>
                                            )
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </Card>
                </section>
            </section>
        </article>
    );
}