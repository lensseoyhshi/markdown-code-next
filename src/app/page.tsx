// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Button, Typography, message, Card, Input, Divider } from 'antd';
import { FileMarkdownOutlined, DownloadOutlined, CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { downloadFile } from '../services/api';
import { extractFileName } from '../utils/file';
import FileUploader from '../components/FileUploader';
import ProcessingProgress from '../components/ProcessingProgress';
import ConversionResult from '../components/ConversionResult';
import ErrorHandler from '../components/ErrorHandler';
import FAQSection from '../components/FAQSection';
import { usePageLoading } from '../hooks/usePageLoading';
import { Progress } from 'antd';
import { marked } from 'marked';
import { Tabs } from 'antd';
import { defaultMarkdown } from '../config/faq';

import Link from 'next/link';
const { Title, Text, Paragraph } = Typography;

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
    const [markdownText, setMarkdownText] = useState(defaultMarkdown);
    const [htmlPreview, setHtmlPreview] = useState('');

    useEffect(() => {
        const initialHtml = marked.parse(defaultMarkdown);
        setHtmlPreview(initialHtml);
    }, []);

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
                    AI-Powered Markdown to HTML Online Converter 
                </h1>
                <p className="text-gray-600 mb-4">
                    Real-time Preview, File Upload Support, Free To Use, No Registration Required.
                </p>
            </header>

            {/* 目录导航 */}
            {/* <nav className="mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                    <a href="#convert" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        Convert MD File
                    </a>
                    <a href="#editor" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        Real-time Editor
                    </a>
                    <a href="#syntax" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        Popular Syntax
                    </a>
                    <a href="#advanced" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        Advanced Syntax
                    </a>
                    <a href="#faq" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        FAQ
                    </a>
                    <a href="#resources" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        Resources
                    </a>
                </div>
            </nav> */}

            <section aria-label="conversion-process" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4" id="convert">Convert MD File To HTML File</h2>
                <section aria-label="file-upload" className="mb-6">
                    <Card style={{ minHeight: '75px', padding: '12px' }}>
                        <div className="space-y-1">
                            <FileUploader
                                key={uploaderKey}
                                onFileSelected={handleFileSelected}
                                disabled={isProcessing}
                            />

                            {uploadedFile && !isProcessing && !outputFilePath && (
                                <div className="flex gap-1 mt-1">
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
                    <h2 className="text-2xl font-bold mb-4" id="editor">MD To HTML Real-time Editor</h2>
                    <Card>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <Tabs
                                    items={[
                                        {
                                            key: 'input',
                                            label: 'Input Markdown',
                                            children: (
                                                <div>
                                                    {/* <p className="mb-2 text-gray-600">Type or paste your Markdown text below:</p> */}
                                                    <Input.TextArea
                                                        value={markdownText}
                                                        onChange={(e) => handleMarkdownChange(e.target?.value as string)}
                                                        placeholder="# Hello World\n\nThis is **Markdown** text. Write or paste your content here to see the HTML conversion in real-time."
                                                        className="min-h-[600px] font-mono resize-none"
                                                        style={{ height: '600px', overflowY: 'auto' }}
                                                    />
                                                </div>
                                            )
                                        },
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

         

                {/* Markdown 语法部分 */}
                <section className="mt-8">
                    <h2 className="text-2xl font-bold mb-4" id="syntax">Popular Markdown Syntax</h2>
                    <Card>
                        <div className="prose prose-slate max-w-none">

                        <Title level={3} id="line-breaks">Line Breaks</Title>
                <Paragraph>
                    To create a new line, end a line with two or more spaces, and then press Enter.
                </Paragraph>
            
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded border font-mono">
{`This is the first line. And this is the second line.`}
                                </div>
                                <div 
                                    className="bg-white p-4 rounded border prose prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: marked.parse(`<p>This is the first line.<br>
And this is the second line.</p>`)
                                    }}
                                />
                            </div>

                            <Title level={3} id="headings">Underline</Title>
                            <Paragraph>
                            While Markdown doesn't natively support underlines, you can use HTML's tag. Below is a bilingual example.
                            </Paragraph>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">  
  <div className="bg-gray-50 p-4 rounded border font-mono">  
    {`Use <u>HTML tags</u> in Markdown for underlines`}  
  </div>  
  <div className="bg-white p-4 rounded border prose prose-slate max-w-none">  
    <p>Use <u>HTML tags</u> in Markdown for underlines</p>  
  </div>  
</div>  

                            <Title level={3} id="emphasis">Text Bold</Title>
                            <Paragraph>
                                You can add emphasis by making text bold or italic.
                            </Paragraph>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded border font-mono">
{`*This text is italic*
_This is also italic_

**This text is bold**
__This is also bold__

***This text is bold and italic***
**_This is also bold and italic_**`}
                                </div>
                                <div 
                                    className="bg-white p-4 rounded border prose prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: marked.parse(`*This text is italic*
_This is also italic_

**This text is bold**
__This is also bold__

***This text is bold and italic***
**_This is also bold and italic_**`)
                                    }}
                                />
                            </div>

                            <Title level={3} id="lists">Horizontal Line</Title>
                            <Paragraph>
                                You can use '---' to create a horizontal line on markdown.
                            </Paragraph>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">  
  <div className="bg-gray-50 p-4 rounded border font-mono">  
    {`First paragraph...  

---  

Second paragraph below the line`}  
  </div>  
  <div className="bg-white p-4 rounded border prose prose-slate max-w-none">  
    <p>First paragraph...</p>  
    <hr/>  
    <p>Second paragraph below the line</p>  
  </div>  
</div>  
                        </div>
                    </Card>
                </section>


             
                       {/* FAQ部分 */}
                       <section className="mt-8">
                    <h2 className="text-2xl font-bold mb-4" id="faq">Frequently Asked Questions</h2>
                    <FAQSection />
                </section>
                   {/* 相关资源链接 */}
                   <section className="mt-8">
                    <h2 className="text-2xl font-bold mb-4" id="resources">Learning Resources</h2>
                    <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="border p-4 rounded">
                                <h3 className="font-bold mb-2">Markdown Guides</h3>
                                <ul className="space-y-1">
                                    <li><a href="/markdown-guide" className="text-blue-500 hover:underline">Complete Markdown Guide</a></li>
                                    <li><a href="https://www.markdownguide.org/basic-syntax/" className="text-blue-500 hover:underline">Markdown Basic Syntax</a></li>
                                    <li><a href="https://github.github.com/gfm/" className="text-blue-500 hover:underline">GitHub Flavored Markdown</a></li>
                                </ul>
                            </div>
                            <div className="border p-4 rounded">
                                <h3 className="font-bold mb-2">HTML Resources</h3>
                                <ul className="space-y-1">
                                    <li><a href="/html-basics" className="text-blue-500 hover:underline">HTML Basics for Beginners</a></li>
                                    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML" className="text-blue-500 hover:underline">MDN HTML Documentation</a></li>
                                    <li><a href="https://www.w3schools.com/html/" className="text-blue-500 hover:underline">W3Schools HTML Tutorial</a></li>
                                </ul>
                            </div>
                            {/*<div className="border p-4 rounded">*/}
                            {/*    <h3 className="font-bold mb-2">Other Tools</h3>*/}
                            {/*    <ul className="space-y-1">*/}
                            {/*        <li><a href="/html-to-markdown" className="text-blue-500 hover:underline">HTML to Markdown Converter</a></li>*/}
                            {/*        <li><a href="/markdown-editor" className="text-blue-500 hover:underline">Online Markdown Editor</a></li>*/}
                            {/*        <li><a href="/html-validator" className="text-blue-500 hover:underline">HTML Validator</a></li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </div>
                    </Card>
                </section>
            </section>

            {/* 页脚 */}
            <footer className="mt-12 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} AI2Markdown - Free Online Markdown to HTML Converter</p>
                <p className="mt-1">
                    <a href="/privacy" className="text-blue-500 hover:underline mr-4">Privacy Policy</a>
                    <a href="/terms" className="text-blue-500 hover:underline mr-4">Terms of Service</a>
                    <a href="/contact" className="text-blue-500 hover:underline">Contact Us</a>
                </p>
            </footer>
        </article>
    );
}
