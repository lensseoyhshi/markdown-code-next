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
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.title}`
    },
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: [{name: siteMetadata.author.name}], // 修改这里，使用author.name
    creator: siteMetadata.creator,
    openGraph: {
        type: 'website',
        locale: siteMetadata.locale, // 修改这里，使用locale而不是language
        url: siteMetadata.siteUrl,
        title: siteMetadata.title,
        description: siteMetadata.description,
        siteName: siteMetadata.title
    },
    twitter: {
        card: 'summary_large_image',
        title: siteMetadata.title,
        description: siteMetadata.description,
        creator: siteMetadata.twitter?.creator || '@yourhandle' // 添加可选链和默认值
    },
    robots: {
        index: true,
        follow: true
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
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}
