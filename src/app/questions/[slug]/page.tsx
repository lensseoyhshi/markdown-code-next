'use client';
import { Button, Divider, Typography } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { usePageLoading } from '@/hooks/usePageLoading';
import { EditOutlined } from '@ant-design/icons';
import ConverterCard from '@/components/ConverterCard';
import { Metadata } from 'next';

const { Title, Paragraph, Text } = Typography;

// 问题内容接口
interface QuestionContent {
    title: string;
    description: string;
    keywords: string;
    content: React.ReactNode;
}

// 添加 generateMetadata 函数
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     const question = questionsData[params.slug];
    
//     if (!question) {
//         return {
//             title: 'Question Not Found',
//             description: 'The requested question could not be found.'
//         };
//     }

//     return {
//         title: question.title,
//         description: question.description,
//         openGraph: {
//             title: question.title,
//             description: question.description,
//             type: 'article'
//         }
//     };
// }

// 问题数据
const questionsData: Record<string, QuestionContent> = {
    'underline-in-markdown': {
        title: "How to underline in markdown?",
        description: 'Learn different ways to create underlined text in Markdown documents',
        keywords: '',
        content: (
            <>
                <Paragraph className="text-lg">
                    There are several methods to create underlined text in Markdown. Since native Markdown syntax doesn't directly support underlining, we need to use alternative approaches:
                </Paragraph>
                
                <Title level={3}>Using HTML Tags</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>{"<u>"} Tag:</Text> The most direct way is using HTML's u tag
                            <br />
                            <Text code>{"<u>This is underlined text</u>"}</Text>
                            <br />
                            <u>Example: This is underlined text</u>
                        </li>
                        <li>
                            <Text strong>{"<ins>"} Tag:</Text> Represents inserted text, also displays with underline
                            <br />
                            <Text code>{"<ins>This is inserted text</ins>"}</Text>
                            <br />
                            <ins>Example: This is inserted text</ins>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={3}>Using CSS Styles</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Inline Style:</Text> Adding underline using style attribute
                            <br />
                            <Text code>{"<span style='text-decoration: underline'>Using CSS to add underline</span>"}</Text>
                            <br />
                            <span style={{textDecoration: 'underline'}}>Example: Using CSS to add underline</span>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={3}>Important Considerations</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Readability:</Text> 
                            Underlines are typically used to indicate links in web design. Excessive use may affect document readability
                        </li>
                        <li>
                            <Text strong>Compatibility:</Text> 
                            HTML tag methods work in most Markdown editors, but some strict environments might filter HTML tags
                        </li>
                    </ul>
                </Paragraph>
                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
                {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <Text strong>Want to convert your Markdown to HTML?</Text>
                    <div className="mt-4">
                        <Link href="/markdown-to-html">
                            <Button type="primary">
                                Use Converter Tool
                            </Button>
                        </Link>
                    </div>
                </div> */}
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