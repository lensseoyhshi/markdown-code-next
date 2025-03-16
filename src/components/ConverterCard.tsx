'use client';
import { Button, Typography, Card } from 'antd';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function ConverterCard() {
    return (
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
    );
}