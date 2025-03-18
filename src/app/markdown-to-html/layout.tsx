import type { Metadata } from 'next'
import {siteMetadata} from '@/config/base_metadata';

const siteUrl = "https://www.ai2markdown.com/markdown-to-html"

export const metadata: Metadata = {
    title: 'Free Markdown to HTML Converter - Ai2Markdown',
    description: 'Ai2Markdown can convert markdown to HTML with AI-Powered Precision | Real-Time Preview & GitHub-Style Export',
    //keywords: 'markdown, md, converter, online tool, free, markdown to html, md to html,html generator,markdown syntax',
    openGraph: {
        type: 'website',
        locale: siteMetadata.locale,
        url: siteUrl,
        title: 'Free Markdown to HTML Converter - Ai2Markdown',
        description: 'Ai2Markdown Can Convert Your Markdown to HTML with AI-Powered Precision | Real-Time Preview & GitHub-Style Export',
        siteName: 'AI2Markdown',
        images: [
            {
                url: `${siteUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Markdown to HTML Converter'
            }
        ]
    },
    alternates: {
        canonical: siteMetadata.siteUrl
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    );
}