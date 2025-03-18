
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {siteMetadata} from '@/config/base_metadata';

export const metadata = {
    title: 'Contact Us - AI2Markdown',
    description: 'Contact information for Markdown converter tool'
    ,
    alternates: {
        canonical: siteMetadata.siteUrl
    }
};

export default function Contact() {
    return (
        <article className="container mx-auto p-4 max-w-3xl">
            <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Converter
            </Link>
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="prose lg:prose-xl">
                <p>We&apos;d love to hear from you! Here&apos;s how you can reach us:</p>
                
                <h2>Email</h2>
                <p>For general inquiries: lensseoyhshi@gmail.com</p>

                <h2>Social Media</h2>
                <p>Follow us on:</p>
                <ul>
                    <li>Twitter: @ai2markdown</li>
                    <li>GitHub: github.com/ai2markdown</li>
                </ul>

                <h2>Response Time</h2>
                <p>
                    We&apos;re here to help! If you have any questions, don&apos;t hesitate to reach out.
                </p>
                <p>We typically respond to all inquiries within 24-48 hours during business days.</p>
            </div>
        </article>
    );
}