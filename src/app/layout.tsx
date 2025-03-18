// src/app/layout.tsx
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import {ConfigProvider} from 'antd';
import enUS from 'antd/locale/en_US';
import { getFAQSchemaData } from '@/config/faq';

const inter = Inter({subsets: ['latin']});
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});
import 'antd/dist/reset.css';
import {siteMetadata} from '../config/base_metadata';
import Navigation from '@/components/Navigation';

export const metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: 'Markdown File Converter | The Best Tool to Convert Markdown to Any Format',
    },
    description: 'Convert any document to clean Markdown format instantly - 100% Free, No Registration Required. Support PDF, Word, PowerPoint, Excel and more. Fast, secure, and easy to use online converter with instant results.',
    //keywords: 'markdown, md, converter, online tool, free, markdown to html, md to html,html generator,markdown syntax',
    authors: [{name: siteMetadata.author.name}],
    creator: siteMetadata.creator,
    openGraph: {
        type: 'website',
        locale: siteMetadata.locale,
        url: siteMetadata.siteUrl,
        title: 'Markdown File Converter',
        description: 'Convert any document to clean Markdown format instantly - 100% Free, No Registration Required. Support PDF, Word, PowerPoint, Excel and more. Fast, secure, and easy to use online converter with instant results.',
        siteName: 'AI2Markdown',
        images: [
            {
                url: `${siteMetadata.siteUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Markdown to HTML Converter'
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    alternates: {
        canonical: siteMetadata.siteUrl
    }
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="loading">
        <head>
            {/* 移除内联 style 标签，改为在 globals.css 中定义 */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#4A90E2" />

            {/* 网站的排名等信息 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Free Markdown to HTML Converter - Ai2Markdown Pro",
                        "applicationCategory": "WebApplication",
                        "operatingSystem": "Any",
                        "description": "Ai2Markdown Can Convert Your Markdown to HTML with AI-Powered Precision | Real-Time Preview & GitHub-Style Export.",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": "818",
                            "bestRating": "5",
                            "worstRating": "1"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "screenshot": `${siteMetadata.siteUrl}/screenshot.png`,
                        "featureList": "Markdown Real-time preview, File upload support, Direct HTML download, Raw HTML view",
                        "keywords": "markdown, md, converter, tool, free, markdown to html, md to html, html generator,markdown syntax"
                    })
                }}
            />

            {/* 添加网站结构化数据 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": siteMetadata.siteUrl,
                        "name": "Free Markdown to HTML Converter - Ai2Markdown Pro",
                        "description": "Ai2Markdown Can Convert Your Markdown to HTML with AI-Powered Precision | Real-Time Preview & GitHub-Style Export",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": `${siteMetadata.siteUrl}/search?q={search_term_string}`,
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />

            {/* FAQ 页面结构化数据 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getFAQSchemaData())
                }}
            />
        </head>
        <body>
        <Navigation />
        {children}
        </body>
        </html>
    );
}
