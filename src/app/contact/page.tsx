
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const metadata = {
    title: 'Contact Us - AI2Markdown',
    description: 'Contact information for AI2Markdown converter tool'
};

export default function Contact() {
    return (
        <article className="container mx-auto p-4 max-w-3xl">
<Link href="/markdown-to-html" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Converter
            </Link>
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="prose lg:prose-xl">
                <p>We'd love to hear from you! Here's how you can reach us:</p>
                
                <h2>Email</h2>
                <p>For general inquiries: lensseoyhshi@gmail.com</p>

                <h2>Social Media</h2>
                <p>Follow us on:</p>
                <ul>
                    <li>Twitter: @ai2markdown</li>
                    <li>GitHub: github.com/ai2markdown</li>
                </ul>

                <h2>Response Time</h2>
                <p>We typically respond to all inquiries within 24-48 hours during business days.</p>
            </div>
        </article>
    );
}