import { MetadataRoute } from 'next';
import { siteMetadata } from '../config/base_metadata';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteMetadata.title,
        short_name: 'MD Converter',
        description: siteMetadata.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1677ff',
        // icons: [
        //     {
        //         src: '/icons/icon-192x192.png',
        //         sizes: '192x192',
        //         type: 'image/png'
        //     },
        //     {
        //         src: '/icons/icon-512x512.png',
        //         sizes: '512x512',
        //         type: 'image/png'
        //     }
        // ]
    };
}