// config/metadata.ts
export const siteMetadata = {
    title: 'Markdown to HTML Converter',
    description: 'Convert your Markdown files to HTML easily and quickly',
    siteUrl: 'https://www.ai2markdown.com', // 替换为您的实际网站URL
    siteName: 'MD Converter',
    locale: 'en-US',
    type: 'website',
    author: {
        name: 'ai to markdown',
        url: 'https://www.ai2markdown.com',
    },
    keywords: [
        'markdown',
        'html',
        'converter',
        'markdown to html',
        'online tool',
        'web app',
        'html to markdown',
        'markdown converter'
    ],
    creator: 'aiToMarkdown',
    publisher: 'ai to markdown',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Markdown to HTML Converter',
        description: 'Convert your Markdown files to HTML easily and quickly',
        url: 'https://www.ai2markdown.com',
        siteName: 'MD Converter',
        images: [
            {
                url: 'https://www.ai2markdown.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Markdown to HTML Converter',
            },
        ],
        locale: 'en-US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Markdown to HTML Converter',
        description: 'Convert your Markdown files to HTML easily and quickly',
        creator: '@ai2Markdown',
        images: ['https://www.ai2markdown.com/twitter-image.jpg'],
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
