import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Complete Markdown Guide - Free Markdown to HTML Converter | AI2Markdown',
    description: 'Learn everything about Markdown, from basic syntax to advanced features. Plus, convert your Markdown to HTML instantly with our free online tool.',
    keywords: 'markdown guide, markdown to html, markdown converter, markdown tutorial, markdown syntax',
    openGraph: {
        title: 'Complete Markdown Guide - Free Markdown to HTML Converter',
        description: 'Learn everything about Markdown, from basic syntax to advanced features. Convert Markdown to HTML instantly.',
        url: 'https://www.ai2markdown.com',
        siteName: 'AI2Markdown',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'AI2Markdown - Markdown Guide and Converter',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Complete Markdown Guide - AI2Markdown',
        description: 'Learn Markdown and convert to HTML instantly with our free tool',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://www.ai2markdown.com',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};