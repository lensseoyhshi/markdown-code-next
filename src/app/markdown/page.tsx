import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export default function GonePage() {
  // 这个函数永远不会被执行，因为我们在 generateMetadata 中已经返回了 410 状态码
  return null;
}

export async function generateMetadata() {
  // 设置 HTTP 状态码为 410 Gone
  const headersList = headers();
  
  // 这里我们需要使用一个技巧来设置状态码
  // 在 Next.js 中，我们可以通过抛出一个特殊的错误来设置状态码
  return {
    title: '页面已下线',
    status: 410,
    description: '此页面已永久移除'
  };
}