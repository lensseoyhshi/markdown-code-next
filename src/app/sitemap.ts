import { MetadataRoute } from 'next';
import { siteMetadata } from '../config/metadata';

// 当前日期
const currentDate = new Date();

// 您网站的主要路由
const routes = [
    '',           // 首页
    '/about',     // 关于页面
    '/contact',   // 联系页面
    '/markdown',  // Markdown转换器页面
];

export default function sitemap(): MetadataRoute.Sitemap {
    // 基本URL项
    const routeEntries = routes.map((route) => ({
        url: `${siteMetadata.siteUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'daily' : 'weekly' as 'daily' | 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [
        // 首页和静态路由
        ...routeEntries,

        // 您可以在此处添加动态生成的路由
        // 例如，从数据库或API获取的内容页面
        // {
        //   url: `${siteMetadata.siteUrl}/blog/post-1`,
        //   lastModified: new Date('2023-01-01'),
        //   changeFrequency: 'monthly',
        //   priority: 0.5,
        // },
    ];
}
