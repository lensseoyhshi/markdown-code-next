// src/app/layout.tsx
import './globals.css';
import {Inter} from 'next/font/google';
import {ConfigProvider} from 'antd';
import enUS from 'antd/locale/en_US';

const inter = Inter({subsets: ['latin']});
import 'antd/dist/reset.css';
import {siteMetadata} from '../config/metadata';

export const metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: 'Markdown to HTML Converter | Convert MD Files Online',
        template: `%s | Markdown to HTML Converter`
    },
    description: 'Free online tool to convert Markdown files to HTML format with real-time preview. No installation required, works in your browser.',
    keywords: 'markdown converter, md to html, markdown to html, online markdown converter, markdown editor, html generator, free markdown tool',
    authors: [{name: siteMetadata.author.name}],
    creator: siteMetadata.creator,
    openGraph: {
        type: 'website',
        locale: siteMetadata.locale,
        url: siteMetadata.siteUrl,
        title: 'Markdown to HTML Converter | Convert MD Files Online',
        description: 'Free online tool to convert Markdown files to HTML format with real-time preview. No installation required, works in your browser.',
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
    twitter: {
        card: 'summary_large_image',
        title: 'Markdown to HTML Converter | Free Online Tool',
        description: 'Easily convert Markdown to HTML with this free online tool. Real-time preview, instant download.',
        creator: siteMetadata.twitter?.creator || '@yourhandle',
        images: [`${siteMetadata.siteUrl}/twitter-image.png`]
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
            <style>{`
          .loading {
            background-color: #f5f5f5;
          }
          .loading * {
            transition: all 0.2s;
          }
        `}</style>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#4A90E2" />

            {/* 更丰富的结构化数据 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Markdown to HTML Converter",
                        "applicationCategory": "WebApplication",
                        "operatingSystem": "Any",
                        "description": "Free online tool to convert Markdown files to HTML format with real-time preview. No installation required, works in your browser.",
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
                        "featureList": "Real-time preview, File upload support, Direct HTML download, Raw HTML view",
                        "keywords": "markdown converter, md to html, markdown editor"
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
                        "name": "Markdown to HTML Converter",
                        "description": "Free online tool to convert Markdown files to HTML format",
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
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is Markdown?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Why convert Markdown to HTML?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "HTML is the standard language for web pages. Converting Markdown to HTML allows you to use your content on websites, blogs, and other web platforms."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is this tool free to use?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, this Markdown to HTML converter is completely free to use with no limitations."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do you store my Markdown files?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No, all conversion happens in your browser. We don't store or process your files on our servers."
                                }
                            }
                        ]
                    })
                }}
            />
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}
