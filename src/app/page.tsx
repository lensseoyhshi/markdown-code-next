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
                    <Title
                        level={1}
                        className="font-heading text-4xl font-bold tracking-tight text-gray-900 mb-6"
                    >
                        Markdown Converter Guide
                    </Title>

                    {/* 添加介绍部分 */}
                    <div className="mb-8">
                        <Paragraph className="text-lg">
                            Welcome to AI2Markdown, your comprehensive solution for all things Markdown. Whether you&apos;re a developer, writer, or content creator, our tools and guides help you master Markdown formatting with ease.
                        </Paragraph>
                        <Paragraph className="text-lg">
                            Our free online converter transforms Markdown to clean, semantic HTML instantly. Plus, explore our growing collection of Markdown tutorials and best practices to enhance your documentation workflow.
                        </Paragraph>
                    </div>

                    {/* 保持现有的 Card 部分不变 */}
                    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300"
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

                    {/* 添加特性部分 */}
                    <section className="mb-12">
                        <Title level={2} className="flex items-center gap-2">
                            <CheckCircleOutlined />
                            Why Choose Our Markdown Convert Tools?
                        </Title>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <Card className="hover:shadow-md transition-shadow">
                                <Title level={4}>Fast & Free Conversion</Title>
                                <Text>Convert Markdown to HTML instantly with our optimized converter. No registration required.</Text>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow">
                                <Title level={4}>Clean HTML Output</Title>
                                <Text>Get semantic, well-formatted HTML that&apos;s ready for web publishing.</Text>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow">
                                <Title level={4}>Privacy First</Title>
                                <Text>Your content stays private. No storage, no tracking - just pure conversion.</Text>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow">
                                <Title level={4}>Developer Friendly</Title>
                                <Text>Perfect for documentation, README files, and technical writing.</Text>
                            </Card>
                        </div>
                    </section>

                    {/* 扩展问题列表部分 */}
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
                                            How to underline in markdown?
                                        </Title>
                                        <Text type="secondary">
                                            Learn different ways to create underlined text in Markdown documents
                                        </Text>
                                    </div>
                                    <RightOutlined className="text-gray-400" />
                                </div>
                            </Card>
                        

                            {/* 添加 Bold in Markdown 问题卡片 */}
                            <Card
                                hoverable
                                className="transition-all duration-300 hover:shadow-md"
                                onClick={() => window.location.href = '/questions/bold-in-markdown'}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Title level={3} className="!mb-2">
                                            How to bold in markdown?
                                        </Title>
                                        <Text type="secondary">
                                            Learn how to make text bold in Markdown using different methods
                                        </Text>
                                    </div>
                                    <RightOutlined className="text-gray-400" />
                                </div>
                            </Card>
                             
                             <Card
                                hoverable
                                className="transition-all duration-300 hover:shadow-md"
                                onClick={() => window.location.href = '/questions/hide-sections-in-markdown'}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Title level={3} className="!mb-2">
                                            How to hide sections in markdown?
                                        </Title>
                                        <Text type="secondary">
                                            Learn different ways to hide or collapse content in Markdown documents
                                        </Text>
                                    </div>
                                    <RightOutlined className="text-gray-400" />
                                </div>
                            </Card>

                            <Card
                                hoverable
                                className="transition-all duration-300 hover:shadow-md"
                                onClick={() => window.location.href = '/questions/collapsible-list-in-markdown'}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Title level={3} className="!mb-2">
                                            How to make a markdown box item collapsable?
                                        </Title>
                                        <Text type="secondary">
                                            Learn how to create collapsible list items and boxes in Markdown
                                        </Text>
                                    </div>
                                    <RightOutlined className="text-gray-400" />
                                </div>
                            </Card>

                            <Card
                                hoverable
                                className="transition-all duration-300 hover:shadow-md"
                                onClick={() => window.location.href = '/questions/collapsible-box-in-markdown'}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Title level={3} className="!mb-2">
                                            How to make box item collapsable in markdown?
                                        </Title>
                                        <Text type="secondary">
                                            Learn how to create collapsible boxes and containers in Markdown
                                        </Text>
                                    </div>
                                    <RightOutlined className="text-gray-400" />
                                </div>
                            </Card>
                        </div>
                    </section>

                    {/* 添加 CTA 部分 */}
                    {/* <section className="mt-12 mb-8">
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                            <Title level={2}>Start Converting Your Markdown Today</Title>
                            <Paragraph className="text-lg mb-6">
                                Join thousands of developers and writers who trust our tools for their Markdown needs. Try our converter now and experience the difference.
                            </Paragraph>
                            <Link href="/markdown-to-html">
                                <Button type="primary" size="large" icon={<EditOutlined />}>
                                    Try Free Converter
                                </Button>
                            </Link>
                        </Card>
                    </section> */}
                </Typography>

                {/* 保持现有的 footer 不变 */}
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
