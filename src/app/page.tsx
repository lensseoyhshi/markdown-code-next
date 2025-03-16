// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Button, Typography, message, Card, Input, Divider } from 'antd';
import { FileMarkdownOutlined, DownloadOutlined, CheckCircleOutlined, QuestionCircleOutlined,RightOutlined } from '@ant-design/icons';
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
import {ArrowLeftOutlined, EditOutlined} from '@ant-design/icons';
import BreadcrumbNav from '../components/Breadcrumb';
const { Title, Text, Paragraph } = Typography;

import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto p-4 max-w-4xl flex-grow">
                {/* <BreadcrumbNav /> */}
                
                <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                    <ArrowLeftOutlined className="mr-1"/> Back to Converter
                </Link>
    
                <Typography>
                    <Title level={1}>Complete Markdown Guide</Title>
                    
                    <Card 
                        className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                        bodyStyle={{ padding: '2rem' }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <Text className="text-xl font-semibold block mb-2">
                                    Want to convert your Markdown to HTML?
                                </Text>
                                <Text className="text-gray-600">
                                    Try our free converter tool - Simple, Fast, and Reliable.
                                </Text>
                            </div>
                            <Link href="/markdown-to-html">
                                <Button 
                                    type="primary" 
                                    icon={<EditOutlined />} 
                                    size="large"
                                    className="min-w-[160px] h-12 text-base flex items-center justify-center font-medium hover:opacity-90"
                                    style={{ 
                                        background: 'linear-gradient(to right, #2563eb, #3b82f6)',
                                        border: 'none',
                                        color: 'white',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Open Converter
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* 添加问题列表部分 */}
                    <section className="mt-12">
                        <Title level={2} className="flex items-center gap-2">
                            <QuestionCircleOutlined />
                            Popular Markdown Questions
                        </Title>
                        <div className="space-y-4 mt-6">
                            <Card 
                                hoverable 
                                className="transition-all duration-300 hover:shadow-md"
                                onClick={() => window.location.href = '/questions/underline-in-markdown'}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Title level={3} className="!mb-2">
                                            How to underline with markdown?
                                        </Title>
                                        <Text type="secondary">
                                            Learn the key differences and advantages of these markup languages
                                        </Text>
                                    </div>
                                    <RightOutlined className="text-gray-400" />
                                </div>
                            </Card>
                        </div>
                    </section>
                </Typography>
            </div>
            
            <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-200 mt-auto">
                <p>© {new Date().getFullYear()} AI2Markdown - Free Online Markdown to HTML Converter</p>
                <p className="mt-1">
                    <a href="/privacy" className="text-blue-500 hover:underline mr-4">Privacy Policy</a>
                    <a href="/terms" className="text-blue-500 hover:underline mr-4">Terms of Service</a>
                    <a href="/contact" className="text-blue-500 hover:underline">Contact Us</a>
                </p>
            </footer>
        </div>
    );
}
