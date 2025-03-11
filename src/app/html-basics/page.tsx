// src/app/markdown-basics/page.tsx
export default function MarkdownBasics() {
    return (
        <article className="container mx-auto p-4 max-w-4xl prose prose-slate lg:prose-lg">
            <h1>Markdown Basics: A Complete Guide for Beginners</h1>

            <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <p className="font-medium">Need to convert your Markdown to HTML? Try our <a href="/">free converter tool</a>.</p>
            </div>

            <h2>What is Markdown?</h2>
            <p>Markdown is a lightweight markup language created by John Gruber in 2004...</p>

            <h2>Basic Syntax</h2>

            <h3>Headings</h3>
            <p>Create headings using the hash symbol (#):</p>
            <pre className="bg-gray-100 p-4 rounded"># Heading 1
## Heading 2
### Heading 3</pre>

            <p>Which renders as:</p>
            <div className="border p-4 rounded mb-6">
                <h1 className="mt-0">Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
            </div>

            {/* 其他语法章节 */}

            <h2>Converting Markdown to HTML</h2>
            <p>Once you&apos;ve written your content in Markdown, you&apos;ll often need to convert it to HTML for use on websites...</p>
            <p><a href="/" className="font-medium">Try our Markdown to HTML converter</a> to instantly transform your Markdown content into clean HTML.</p>

            <div className="border-t mt-12 pt-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>Have questions about Markdown? <a href="/contact">Contact us</a> or check our <a href="/faq">FAQ page</a>.</p>
            </div>
        </article>
    );
}
