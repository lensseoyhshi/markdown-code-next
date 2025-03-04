import { MetadataRoute } from 'next';
import { siteMetadata } from '../config/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteMetadata.siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        }
    ];
}