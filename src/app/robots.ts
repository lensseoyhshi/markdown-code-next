import { MetadataRoute } from 'next';
import { siteMetadata } from '../config/base_metadata';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/markdown/',
        },
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    };
}