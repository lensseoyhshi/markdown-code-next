// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const inter = Inter({ subsets: ['latin'] });

// 引入Antd样式
import 'antd/dist/reset.css';

export const metadata = {
  title: 'Markdown 转 HTML 工具',
  description: '上传Markdown文件并转换为HTML格式',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="zh-CN">
      <body className={inter.className}>
      <ConfigProvider locale={zhCN}>
        <main className="min-h-screen bg-gray-100 py-8">
          {children}
        </main>
      </ConfigProvider>
      </body>
      </html>
  );
}
