import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const metadata = {
    title: 'Terms of Service - Markdown to HTML Converter',
    description: 'Terms of Service for our Markdown to HTML conversion tool'
};

export default function Terms() {
    return (
        <article className="container mx-auto p-4 max-w-3xl">
            <Link href="/markdown-to-html" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Converter
            </Link>
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose lg:prose-xl">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using this Markdown to HTML conversion service, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                <h2>2. Service Description</h2>
                <p>We provide a free online tool for converting Markdown text to HTML format. The service is provided "as is" without any warranties.</p>

                <h2>3. Use License</h2>
                <p>This service is available for both personal and commercial use. Users must:</p>
                <ul>
                    <li>Use the service legally and responsibly</li>
                    <li>Not attempt to damage or disrupt the service</li>
                    <li>Not use the service for any illegal purposes</li>
                    <li>Not upload malicious content or code</li>
                </ul>

                <h2>4. Content Rights</h2>
                <p>Users retain all rights to their content. By using our service:</p>
                <ul>
                    <li>You confirm you have the right to use the content you convert</li>
                    <li>You understand that content is processed temporarily</li>
                    <li>You accept that we do not store or claim ownership of your content</li>
                </ul>

                <h2>5. Service Limitations</h2>
                <ul>
                    <li>Maximum file size: 10MB per conversion</li>
                    <li>Rate limits may apply to prevent abuse</li>
                    <li>Service availability is not guaranteed</li>
                </ul>

                <h2>6. Disclaimer</h2>
                <p>The service is provided "as is" without warranties of any kind. We are not responsible for:</p>
                <ul>
                    <li>Data loss or corruption during conversion</li>
                    <li>Service interruptions or downtime</li>
                    <li>Accuracy of converted content</li>
                </ul>

                <h2>7. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of new terms.</p>

                <h2>8. Contact</h2>
                <p>For questions about these Terms of Service, please contact us at lensseoyhshi@gmail.com</p>
            </div>
        </article>
    );
}