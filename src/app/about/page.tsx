import {siteMetadata} from '@/config/base_metadata';

export const metadata = {
    title: 'About Our Markdown Converter',
    description: 'Learn more about our free online Markdown to HTML conversion tool'
    ,
    alternates: {
        canonical: siteMetadata.siteUrl
    }
};

export default function About() {
    return (
        <article className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">About Our Markdown Converter</h1>
            <section className="prose lg:prose-xl">
                <h2>What is Markdown?</h2>
                <p>Markdown is a lightweight markup language...</p>
                
                <h2>Features</h2>
                <ul>
                    <li>Fast and efficient conversion</li>
                    <li>Support for standard Markdown syntax</li>
                    <li>Real-time preview</li>
                    <li>Free to use</li>
                </ul>
            </section>
        </article>
    );
}