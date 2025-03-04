// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

const inter = Inter({ subsets: ['latin'] });

import 'antd/dist/reset.css';

import { siteMetadata } from '../config/metadata';

export const metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.title}`
    },
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    openGraph: {
        type: 'website',
        locale: siteMetadata.language,
        url: siteMetadata.siteUrl,
        title: siteMetadata.title,
        description: siteMetadata.description,
        siteName: siteMetadata.title
    },
    twitter: {
        card: 'summary_large_image',
        title: siteMetadata.title,
        description: siteMetadata.description,
        creator: siteMetadata.twitterHandle
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
