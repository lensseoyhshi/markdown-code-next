import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Markdown to HTML Converter | Free Online Tool',
    description: 'Convert Markdown files to HTML format online. Free, fast and easy to use. Support for GitHub Flavored Markdown.',
    keywords: 'markdown, html, converter, online tool, markdown to html, file converter',
    openGraph: {
        title: 'Markdown to HTML Converter',
        description: 'Convert Markdown files to HTML format online',
        type: 'website',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    );
}