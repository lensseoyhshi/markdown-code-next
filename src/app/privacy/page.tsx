import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {siteMetadata} from '@/config/base_metadata';

export const metadata = {
    title: 'Privacy Policy - AI2Markdown',
    description: 'Privacy Policy for our Markdown to HTML conversion tool'
   ,
    alternates: {
        canonical: siteMetadata.siteUrl
    }
};

export default function Privacy() {
    return (
        <article className="container mx-auto p-4 max-w-3xl">
            <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Converter
            </Link>
            <h1 className="text-3xl font-bold mb-6">Privacy Policy-Ai2Markdown</h1>
            <div className="prose lg:prose-xl">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Data Collection and Usage</h2>
                <p>Our Markdown to HTML conversion tool collects the following data:</p>
                <ul>
                    <li>Your Markdown content (temporarily used during conversion only)</li>
                    <li>Basic usage statistics (such as page visits and conversion counts)</li>
                </ul>

                <h2>2. Data Security</h2>
                <p>We commit to:</p>
                <ul>
                    <li>Never permanently store your Markdown content</li>
                    <li>Process all conversions directly in your browser</li>
                    <li>Never share your content with third parties</li>
                </ul>

                <h2>3. Cookie Usage</h2>
                <p>We use cookies solely for:</p>
                <ul>
                    <li>Remembering your preferences</li>
                    <li>Improving user experience</li>
                    <li>Essential website functionality</li>
                </ul>

                <h2>4. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access your data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of cookies (except essential ones)</li>
                </ul>

                <h2>5. Contact Information</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul>
                    <li>Email: lensseoyhshi@gmail.com</li>
                </ul>

                <h2>6. Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </div>
        </article>
    );
}
