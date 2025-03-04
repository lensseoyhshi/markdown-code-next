import { MetadataRoute } from 'next';
import { siteMetadata } from '../config/metadata';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    };
}