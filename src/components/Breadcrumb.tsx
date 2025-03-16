'use client';

import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeOutlined } from '@ant-design/icons';

export default function BreadcrumbNav() {
    const pathname = usePathname();
    
    const getBreadcrumbItems = () => {
        const paths = pathname.split('/').filter(Boolean);
        
        const items = [
            {
                title: (
                    <Link href="/" className="hover:text-blue-500">
                        <HomeOutlined className="mr-1" />
                        首页
                    </Link>
                ),
            }
        ];

        let currentPath = '';
        paths.forEach((path) => {
            currentPath += `/${path}`;
            const formattedName = path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            items.push({
                title: (
                    <Link href={currentPath} className="hover:text-blue-500">
                        {formattedName}
                    </Link>
                ),
            });
        });

        return items;
    };

    return (
        <Breadcrumb 
            items={getBreadcrumbItems()}
            className="mb-4 text-gray-600"
        />
    );
}