'use client';
import { Button, Typography } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { usePageLoading } from '@/hooks/usePageLoading';

const { Title, Paragraph, Text } = Typography;

// 问题内容接口
interface QuestionContent {
    title: string;
    description: string;
    content: React.ReactNode;
}

// 问题数据
const questionsData: Record<string, QuestionContent> = {
    'markdown-vs-html': {
        title: "What's the difference between Markdown and HTML?",
        description: 'Learn the key differences and advantages of these markup languages',
        content: (
            <>
                <Paragraph className="text-lg">
                    Markdown and HTML are both markup languages used for formatting text, but they have several key differences:
                </Paragraph>
                
                <Title level={3}>Syntax Complexity</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Markdown:</Text> Uses simple symbols and text formatting, like # for headings and * for list items
                        </li>
                        <li>
                            <Text strong>HTML:</Text> Uses tag pairs {"<tag></tag>"} to define elements, relatively more complex syntax
                        </li>
                    </ul>
                </Paragraph>

                <Title level={3}>Use Cases</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Markdown:</Text> Perfect for quick document writing, READMEs, blog posts, etc.
                        </li>
                        <li>
                            <Text strong>HTML:</Text> Ideal for building complete web pages and complex layouts
                        </li>
                    </ul>
                </Paragraph>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <Text strong>Need to convert Markdown to HTML?</Text>
                    <div className="mt-4">
                        <Link href="/markdown-to-html">
                            <Button type="primary">
                                Use Converter Tool
                            </Button>
                        </Link>
                    </div>
                </div>
            </>
        ),
    },
};

export default function QuestionPage({ params }: { params: { slug: string } }) {
    const isLoading = usePageLoading();
    const questionData = questionsData[params.slug];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!questionData) {
        return (
            <div className="container mx-auto p-4 max-w-4xl">
                <Title level={1}>Question Not Found</Title>
                <Link href="/">
                    <Button type="primary">Back to Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="container mx-auto p-4 max-w-4xl">
            <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Home
            </Link>

            <Typography>
                <Title level={1}>{questionData.title}</Title>
                <Paragraph className="text-lg text-gray-600 mb-8">
                    {questionData.description}
                </Paragraph>

                <div className="prose prose-slate max-w-none">
                    {questionData.content}
                </div>
            </Typography>
        </article>
    );
}