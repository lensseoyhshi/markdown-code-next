import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 max-w-3xl text-center">
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-6">页面已下线</h1>
        <p className="text-lg mb-8">
          您尝试访问的页面已被永久移除。我们建议您使用我们的新版 Markdown 转换工具。
        </p>
        <Link href="/markdown-to-html" className="flex items-center justify-center text-blue-500 hover:underline">
          <ArrowLeftOutlined className="mr-1"/> 前往新版 Markdown 转换工具
        </Link>
      </div>
    </div>
  );
}