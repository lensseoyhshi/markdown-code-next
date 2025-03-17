'use client';
import { Button, Divider, Typography } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { usePageLoading } from '@/hooks/usePageLoading';
import ConverterCard from '@/components/ConverterCard';

const { Title, Paragraph, Text } = Typography;

interface QuestionClientProps {
    title: string;
    description: string;
    contentHtml: string;
    slug: string;
}

export default function QuestionClient({ title, description, contentHtml, slug }: QuestionClientProps) {
    const isLoading = usePageLoading();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <article className="container mx-auto p-4 max-w-4xl">
            <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Home
            </Link>

            <Typography>
                <Title level={1}>{title}</Title>
                <Paragraph className="text-lg text-gray-600 mb-8">
                    {description}
                </Paragraph>

                <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
            </Typography>
        </article>
    );
}
