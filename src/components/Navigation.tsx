'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
    const pathname = usePathname();
    
    const navItems = [
        { path: '/', label: 'Markdown Guide' },
        { path: '/markdown-to-html', label: 'Markdown to HTML' }
    ];
    
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center space-x-40">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/Logo.svg"
                                alt="AI2Markdown Logo"
                                width={28}
                                height={28}
                            />
                            <span className="font-bold text-lg">AI2Markdown</span>
                        </Link>
                        <div className="flex space-x-6 relative">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-6 py-2 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 font-medium relative ${
                                        pathname === item.path
                                            ? 'text-blue-600 bg-blue-50 shadow-sm hover:bg-blue-100'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    {item.label}
                                    {pathname === item.path && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}