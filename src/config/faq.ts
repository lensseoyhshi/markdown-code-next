export const faqData = [
    {
        id: 'what-is-markdown',
        question: 'What is markdown file?',
        answer: `Markdown is a **lightweight markup language** that you can use to add formatting elements to plaintext text documents.
Some common Markdown elements include:
- **Headers** (using #)
- *Italic text* (using asterisks)
- Lists (using - or numbers)
- [Links](https://example.com)`
    },
    {
        id: 'why-convert',
        question: 'Why convert Markdown to HTML?',
        answer: `HTML is the standard language for web pages. Converting Markdown to HTML allows you to:

1. Use your content on websites and blogs
2. Maintain **consistent formatting**
3. *Easily* share content across different platforms
4. Keep your content **accessible** and well-structured`
    },
    {
        id: 'is-free',
        question: 'How to convert markdown to html?',
        answer: `**JavaScript Libraries**:Use marked.js or showdown for browser/Node.js conversion. 
        **Python Tools**:Use markdown2 or mistune for server-side processing`
    },
    {
        id: 'data-storage',
        question: 'Do you store my Markdown files?',
        answer: `**No**, all conversion happens in your browser. We don't store or process your files on our servers.

> Your privacy is our top priority. All processing is done locally in your browser.`
    }
] as const;

// 为 Schema.org 格式化 FAQ 数据
export const getFAQSchemaData = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }))
});


export const defaultMarkdown = `# Markdown Syntax Guide

## Headers

Use # symbols to create headers:

# Heading 1
## Heading 2
### Heading 3

## Text Formatting

- **Bold text** using **double asterisks**
- *Italic text* using *single asterisks*
- ~~Strikethrough~~ using ~~double tildes~~

## Lists

Unordered list:
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

Ordered list:
1. First item
2. Second item
3. Third item

## Links and Images

[This is a link](https://example.com)
![This is an image](https://example.com/image.jpg)

## Code

Inline code: \`console.log('Hello World')\`

Code block:
\`\`\`javascript
function greeting(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

## Blockquotes

> This is a blockquote
> It can span multiple lines
> > And can be nested

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Horizontal Rule

---

## Task Lists

- [x] Completed task
- [ ] Uncompleted task
- [ ] Todo item
`;