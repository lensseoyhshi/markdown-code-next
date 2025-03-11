'use client';

import React from 'react';
import {Typography, Card, Divider, Button} from 'antd';
import {ArrowLeftOutlined, EditOutlined} from '@ant-design/icons';
import Link from 'next/link';

const {Title, Paragraph, Text} = Typography;

export default function MarkdownGuide() {
    // Function to render markdown examples with HTML output
    // @ts-ignore
    const MarkdownExample = ({ markdown, html }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded border font-mono">
                {markdown}
            </div>
            <div className="bg-white p-4 rounded border">
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );

    // @ts-ignore
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Converter
            </Link>

            <Typography>
                <Title level={1}>Complete Markdown Guide</Title>

                <Paragraph className="text-lg text-gray-700 mb-8">
                    Markdown is a lightweight markup language that allows you to write formatted content using a plain
                    text editor.
                    This guide covers all the essential Markdown syntax you need to know, from basic formatting to
                    advanced features.
                </Paragraph>

                <Card className="mb-8 bg-blue-50 border-blue-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <Paragraph className="mb-4 md:mb-0">
                            <Text strong>Want to convert your Markdown to HTML?</Text> Try our free converter tool.
                        </Paragraph>
                        <Button type="primary" icon={<EditOutlined/>} href="/">
                            Open Converter
                        </Button>
                    </div>
                </Card>

                <Title level={2} id="what-is-markdown">What is Markdown?</Title>
                <Paragraph>
                    Markdown was created by John Gruber in 2004 as a simple way for non-programmers to write content for
                    the web
                    without having to learn HTML. It uses a set of special characters to indicate how text should be
                    formatted.
                </Paragraph>
                <Paragraph>
                    When you write in Markdown, the text is stored in a plain text file with a <Text
                    code>.md</Text> extension.
                    This text can then be converted into HTML, PDF, or other formats.
                </Paragraph>

                <Title level={2} id="why-use-markdown">Why Use Markdown?</Title>
                <Paragraph>
                    Here are some reasons why Markdown has become so popular:
                </Paragraph>
                <ul className="list-disc pl-8 mb-6">
                    <li><Text strong>Simplicity:</Text> Markdown is easy to learn and write</li>
                    <li><Text strong>Portability:</Text> Markdown files are just text and can be opened with any text
                        editor
                    </li>
                    <li><Text strong>Future-proof:</Text> Even if your Markdown processor becomes obsolete, you'll still
                        be able to read your Markdown files
                    </li>
                    <li><Text strong>Versatility:</Text> Markdown can be converted to many output formats, not just HTML
                    </li>
                    <li><Text strong>Widely adopted:</Text> Used on GitHub, Stack Overflow, Reddit, and many other
                        platforms
                    </li>
                </ul>

                <Divider/>

                <Title level={2} id="basic-syntax">Basic Markdown Syntax</Title>

                <Title level={3} id="headings">Headings</Title>
                <Paragraph>
                    Create headings by adding number signs (#) in front of a word or phrase. The number of number signs
                    corresponds to the heading level.
                </Paragraph>
                <MarkdownExample
                    markdown={`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
                    html={`<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>`}
                />

                <Title level={3} id="paragraphs">Paragraphs</Title>
                <Paragraph>
                    To create paragraphs, use a blank line to separate lines of text.
                </Paragraph>
                <MarkdownExample
                    markdown={`This is the first paragraph.

This is the second paragraph.`}
                    html={`<p>This is the first paragraph.</p>
<p>This is the second paragraph.</p>`}
                />

                <Title level={3} id="line-breaks">Line Breaks</Title>
                <Paragraph>
                    To create a line break, end a line with two or more spaces, and then press Enter.
                </Paragraph>
                <MarkdownExample
                    markdown={`This is the first line.  
And this is the second line.`}
                    html={`<p>This is the first line.<br>
And this is the second line.</p>`}
                />

                <Title level={3} id="emphasis">Emphasis</Title>
                <Paragraph>
                    You can add emphasis by making text bold or italic.
                </Paragraph>
                <MarkdownExample
                    markdown={`*This text is italic*
_This is also italic_

**This text is bold**
__This is also bold__

***This text is bold and italic***
**_This is also bold and italic_**`}
                    html={`<p><em>This text is italic</em>
<em>This is also italic</em></p>
<p><strong>This text is bold</strong>
<strong>This is also bold</strong></p>
<p><strong><em>This text is bold and italic</em></strong>
<strong><em>This is also bold and italic</em></strong></p>`}
                />

                <Title level={3} id="blockquotes">Blockquotes</Title>
                <p className="mb-4">
                    To create a blockquote, add a  in front of a paragraph.
                </p>
                <MarkdownExample
                    markdown={`> This is a blockquote
> 
> It can span multiple lines`}
                    html={`<blockquote>
  <p>This is a blockquote</p>
  <p>It can span multiple lines</p>
</blockquote>`}
                />

                <Title level={3} id="lists">Lists</Title>
                <Paragraph>
                    You can organize items into ordered and unordered lists.
                </Paragraph>
                <MarkdownExample
                    markdown={`Unordered list:
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item`}
                    html={`<p>Unordered list:</p>
<ul>
  <li>Item 1</li>
  <li>Item 2
    <ul>
      <li>Nested item 1</li>
      <li>Nested item 2</li>
    </ul>
  </li>
  <li>Item 3</li>
</ul>
<p>Ordered list:</p>
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>`}
                />

                <Title level={3} id="code">Code</Title>
                <Paragraph>
                    To denote a word or phrase as code, enclose it in backticks (`).
                </Paragraph>
                <MarkdownExample
                    markdown={`Inline code: \`var example = "hello";\`

Code block:
\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\``}
                    html={`<p>Inline code: <code>var example = "hello";</code></p>
<p>Code block:</p>
<pre><code class="language-javascript">function helloWorld() {
  console.log("Hello, world!");
}
</code></pre>`}
                />

                <Title level={3} id="horizontal-rules">Horizontal Rules</Title>
                <Paragraph>
                    To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___)
                    on a line by themselves.
                </Paragraph>
                <MarkdownExample
                    markdown={`---

***

___`}
                    html={`<hr>
<hr>
<hr>`}
                />

                <Title level={3} id="links">Links</Title>
                <Paragraph>
                    To create a link, enclose the link text in brackets and then follow it immediately with the URL in
                    parentheses.
                </Paragraph>
                <MarkdownExample
                    markdown={`[Visit our website](https://www.ai2markdown.com)

[Visit with title](https://www.ai2markdown.com "AI2Markdown")

URLs and emails:
<https://www.ai2markdown.com>
<contact@example.com>`}
                    html={`<p><a href="https://www.ai2markdown.com">Visit our website</a></p>
<p><a href="https://www.ai2markdown.com" title="AI2Markdown">Visit with title</a></p>
<p>URLs and emails:
<a href="https://www.ai2markdown.com">https://www.ai2markdown.com</a>
<a href="mailto:contact@example.com">contact@example.com</a></p>`}
                />

                <Title level={3} id="images">Images</Title>
                <Paragraph>
                    To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL
                    to the image in parentheses.
                </Paragraph>
                <MarkdownExample
                    markdown={`![Alt text for the image](image.jpg)

![Alt text](image.jpg "Optional title")`}
                    html={`<p><img src="image.jpg" alt="Alt text for the image"></p>
<p><img src="image.jpg" alt="Alt text" title="Optional title"></p>`}
                />

                <Divider/>

                <Title level={2} id="advanced-syntax">Advanced Markdown Syntax</Title>

                <Title level={3} id="tables">Tables</Title>
                <Paragraph>
                    To add a table, use three or more hyphens (---) to create each column's header, and use pipes (|) to
                    separate columns.
                </Paragraph>
                <MarkdownExample
                    markdown={`| Syntax | Description |
| ------ | ----------- |
| Header | Title |
| Paragraph | Text |`}
                    html={`<table>
  <thead>
    <tr>
      <th>Syntax</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Header</td>
      <td>Title</td>
    </tr>
    <tr>
      <td>Paragraph</td>
      <td>Text</td>
    </tr>
  </tbody>
</table>`}
                />

                <Title level={3} id="fenced-code-blocks">Fenced Code Blocks</Title>
                <Paragraph>
                    You can create fenced code blocks by using triple backticks (```) before and after the code block.
                </Paragraph>
                <MarkdownExample
                    markdown={`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``}
                    html={`<pre><code>{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
</code></pre>`}
                />

                <Title level={3} id="syntax-highlighting">Syntax Highlighting</Title>
                <Paragraph>
                    Many Markdown processors support syntax highlighting for fenced code blocks by specifying a
                    language.
                </Paragraph>
                <MarkdownExample
                    markdown={`\`\`\`json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``}
                    html={`<pre><code class="language-json">{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
</code></pre>`}
                />

                <Title level={3} id="footnotes">Footnotes</Title>
                <Paragraph>
                    Footnotes allow you to add notes and references without cluttering the body of the document.
                </Paragraph>
                <MarkdownExample
                    markdown={`Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.`}
                    html={`<p>Here's a sentence with a footnote. <sup id="fnref:1"><a href="#fn:1">1</a></sup></p>
<div class="footnotes">
  <hr>
  <ol>
    <li id="fn:1">
      <p>This is the footnote. <a href="#fnref:1">↩</a></p>
    </li>
  </ol>
</div>`}
                />

                <Title level={3} id="task-lists">Task Lists</Title>
                <Paragraph>
                    Task lists (or checklists) allow you to create to-do items with checkboxes.
                </Paragraph>
                <MarkdownExample
                    markdown={`- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`}
                    html={`<ul class="contains-task-list">
  <li class="task-list-item"><input type="checkbox" checked disabled> Write the press release</li>
  <li class="task-list-item"><input type="checkbox" disabled> Update the website</li>
  <li class="task-list-item"><input type="checkbox" disabled> Contact the media</li>
</ul>`}
                />

                <Divider/>

                <Title level={2} id="flavors">Markdown Flavors</Title>
                <Paragraph>
                    Different Markdown processors support different sets of features. Here are some common Markdown
                    flavors:
                </Paragraph>
                <ul className="list-disc pl-8 mb-6">
                    <li><Text strong>CommonMark</Text> - A strongly defined specification of Markdown</li>
                    <li><Text strong>GitHub Flavored Markdown (GFM)</Text> - Used on GitHub, extends CommonMark with
                        tables, task lists, etc.
                    </li>
                    <li><Text strong>MultiMarkdown</Text> - Adds features like tables, footnotes, and citations</li>
                    <li><Text strong>Markdown Extra</Text> - Adds features like tables, code blocks, and footnotes</li>
                </ul>

                <Title level={2} id="convert-to-html">Converting Markdown to HTML</Title>
                <Paragraph>
                    Once you've written your content in Markdown, you'll often need to convert it to HTML for use on
                    websites or blogs.
                    Our <Link href="/" className="text-blue-500 hover:underline">Markdown to HTML converter</Link> makes
                    this process quick and easy:
                </Paragraph>
                <ol className="list-decimal pl-8 mb-6">
                    <li>Upload your Markdown file or paste your Markdown text</li>
                    <li>Preview the HTML output in real-time</li>
                    <li>Download the generated HTML file with one click</li>
                </ol>

                <Card className="mb-8 mt-8">
                    <Title level={3}>Start Converting Now</Title>
                    <Paragraph>
                        Ready to convert your Markdown to HTML? Try our free online converter tool - no installation or
                        registration required.
                    </Paragraph>
                    <Button type="primary" size="large" href="/">
                        Go to Markdown Converter
                    </Button>
                </Card>

                <Divider/>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <Title level={2} id="resources">Additional Resources</Title>
                    <Paragraph>
                        Here are some additional resources to help you master Markdown:
                    </Paragraph>
                    <ul className="list-disc pl-8 mb-0">
                        <li><a href="/markdown-cheatsheet" className="text-blue-500 hover:underline">Markdown
                            Cheatsheet</a> - A quick reference guide
                        </li>
                        <li><a href="/html-basics" className="text-blue-500 hover:underline">HTML Basics</a> -
                            Understanding the output format
                        </li>
                        <li><a href="/faq" className="text-blue-500 hover:underline">FAQ</a> - Common questions about
                            Markdown and conversion
                        </li>
                    </ul>
                </div>

                <div className="mt-12 pt-6 border-t text-sm text-gray-500">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        Have questions about Markdown? <a href="/contact" className="text-blue-500 hover:underline">Contact
                        us</a> or check our <a href="/faq" className="text-blue-500 hover:underline">FAQ page</a>.
                    </p>
                </div>
            </Typography>
        </div>
    );
}
