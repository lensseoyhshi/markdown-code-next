'use client';
import { Button, Divider, Typography } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { usePageLoading } from '@/hooks/usePageLoading';
import { EditOutlined } from '@ant-design/icons';
import ConverterCard from '@/components/ConverterCard';
import { Metadata } from 'next';

const { Title, Paragraph, Text } = Typography;

// 问题内容接口
interface QuestionContent {
    title: string;
    description: string;
    keywords: string;
    content: React.ReactNode;
}

// 添加 generateMetadata 函数
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     const question = questionsData[params.slug];
    
//     if (!question) {
//         return {
//             title: 'Question Not Found',
//             description: 'The requested question could not be found.'
//         };
//     }

//     return {
//         title: question.title,
//         description: question.description,
//         openGraph: {
//             title: question.title,
//             description: question.description,
//             type: 'article'
//         }
//     };
// }

// 问题数据
const questionsData: Record<string, QuestionContent> = {
    'underline-in-markdown': {
        title: "How to underline in markdown?",
        description: 'Learn different ways to create underlined text in Markdown documents',
        keywords: '',
        content: (
            <>
                <Paragraph className="text-lg">
                    There are several methods to create underlined text in Markdown. Since native Markdown syntax doesn&apos;t directly support underlining, we need to use alternative approaches:
                </Paragraph>
                
                <Title level={2}>Underlining Text in Markdown Using HTML Tags</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>{"<u>"} Tag:</Text> The most direct way is using HTML&apos;s u tag
                            <br />
                            <Text code>{"<u>This is underlined text</u>"}</Text>
                            <br />
                            <u>Example: This is underlined text</u>
                        </li>
                        <li>
                            <Text strong>{"<ins>"} Tag:</Text> Represents inserted text, also displays with underline
                            <br />
                            <Text code>{"<ins>This is inserted text</ins>"}</Text>
                            <br />
                            <ins>Example: This is inserted text</ins>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Using CSS Styles ​in Markdown to Underline </Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Inline Style:</Text> Adding underline using style attribute
                            <br />
                            <Text code>{"<span style='text-decoration: underline'>Using CSS to add underline</span>"}</Text>
                            <br />
                            <span style={{textDecoration: 'underline'}}>Example: Using CSS to add underline</span>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Important Considerations</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Readability:</Text> 
                            Underlines are typically used to indicate links in web design. Excessive use may affect document readability
                        </li>
                        <li>
                            <Text strong>Compatibility:</Text> 
                            HTML tag methods work in most Markdown editors, but some strict environments might filter HTML tags
                        </li>
                    </ul>
                </Paragraph>
                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
                {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <Text strong>Want to convert your Markdown to HTML?</Text>
                    <div className="mt-4">
                        <Link href="/markdown-to-html">
                            <Button type="primary">
                                Use Converter Tool
                            </Button>
                        </Link>
                    </div>
                </div> */}
            </>
        ),
    },

    'bold-in-markdown': {
        title: "How to bold in markdown?",
        description: 'Learn how to make text bold in Markdown using different methods',
        keywords: 'markdown bold, markdown strong text, markdown formatting',
        content: (
            <>
                <Paragraph className="text-lg">
                    Making text bold in Markdown is one of the most common formatting tasks. There are several ways to create bold text in Markdown:
                </Paragraph>
                
                <Title level={2}>Standard Markdown Bold Syntax</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Double Asterisks:</Text> The most common way
                            <br />
                            <Text code>**This is bold text**</Text>
                            <br />
                            <strong>Example: This is bold text</strong>
                        </li>
                        <li>
                            <Text strong>Double Underscores:</Text> An alternative method
                            <br />
                            <Text code>__This is also bold text__</Text>
                            <br />
                            <strong>Example: This is also bold text</strong>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Using HTML Tags for Bold Text</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>{"<strong>"} Tag:</Text> Semantic HTML for strong importance
                            <br />
                            <Text code>{"<strong>This is strong text</strong>"}</Text>
                            <br />
                            <strong>Example: This is strong text</strong>
                        </li>
                        <li>
                            <Text strong>{"<b>"} Tag:</Text> Traditional HTML bold tag
                            <br />
                            <Text code>{"<b>This is bold text with b tag</b>"}</Text>
                            <br />
                            <b>Example: This is bold text with b tag</b>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Best Practices</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Consistency:</Text> 
                            Choose one method and stick to it throughout your document
                        </li>
                        <li>
                            <Text strong>Semantic Usage:</Text> 
                            Use bold text to emphasize important points, not for decorative purposes
                        </li>
                        <li>
                            <Text strong>Readability:</Text> 
                            Don&apos;t overuse bold text as it can make the document harder to read
                        </li>
                    </ul>
                </Paragraph>

                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
            </>
        ),
    },

    'hide-sections-in-markdown': {
        title: "How to hide sections in markdown?",
        description: 'Learn different ways to hide or collapse content in Markdown documents',
        keywords: 'markdown hide sections, markdown collapsible, markdown details, markdown spoiler',
        content: (
            <>
                <Paragraph className="text-lg">
                    There are several ways to hide or collapse sections in Markdown documents. While pure Markdown doesn&apos;t have built-in hiding functionality, we can achieve this using HTML elements and special syntax:
                </Paragraph>
                
                <Title level={2}>Using HTML Details Element</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Details & Summary Tags:</Text> Create collapsible sections
                            <br />
                            <Text code>{`<details>
    <summary>Click to expand</summary>
    This content is hidden by default
</details>`}</Text>
                            <br />
                            <details>
                                <summary>Click to expand</summary>
                                This content is hidden by default
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Using HTML Comments</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>HTML Comments:</Text> Completely hide content from rendered output
                            <br />
                            <Text code>{`<!-- This content will not be visible in the rendered document -->`}</Text>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Using Spoiler Tags (Platform Specific)</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>GitHub Style:</Text> Some platforms support special syntax
                            <br />
                            <Text code>{`||Spoiler text||`}</Text> (GitHub Discussions)
                        </li>
                        <li>
                            <Text strong>Discord Style:</Text> 
                            <br />
                            <Text code>{`||Hidden content||`}</Text> (Discord Markdown)
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Best Practices</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Compatibility:</Text> 
                            Check if your target platform supports the hiding method you choose
                        </li>
                        <li>
                            <Text strong>Accessibility:</Text> 
                            Ensure hidden content is accessible to screen readers
                        </li>
                        <li>
                            <Text strong>User Experience:</Text> 
                            Provide clear indicators for expandable content
                        </li>
                    </ul>
                </Paragraph>

                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
            </>
        ),
    },

    'collapsible-list-in-markdown': {
        title: "How to make a markdown box item collapsable?",
        description: 'Learn how to create collapsible list items and boxes in Markdown',
        keywords: 'markdown collapsible list, markdown dropdown, markdown accordion, markdown expandable',
        content: (
            <>
                <Paragraph className="text-lg">
                    Creating collapsible list items or boxes in Markdown can enhance document readability. Here are several methods to achieve this:
                </Paragraph>
                
                <Title level={2}>Using HTML Details with Lists</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Basic Collapsible List:</Text>
                            <br />
                            <Text code>{`<details>
    <summary>Expandable List</summary>
    
    - Item 1
    - Item 2
    - Item 3
</details>`}</Text>
                            <br />
                            <details>
                                <summary>Expandable List</summary>
                                <ul>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Nested Collapsible Lists</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Multi-level Collapsible:</Text>
                            <br />
                            <Text code>{`<details>
    <summary>Main Category</summary>
    
    - Group 1
        <details>
        <summary>Subgroup</summary>
        
        - Sub-item 1
        - Sub-item 2
        </details>
</details>`}</Text>
                            <br />
                            <details>
                                <summary>Main Category</summary>
                                <ul>
                                    <li>Group 1
                                        <details>
                                            <summary>Subgroup</summary>
                                            <ul>
                                                <li>Sub-item 1</li>
                                                <li>Sub-item 2</li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Styled Collapsible Boxes</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Custom Styled Box:</Text>
                            <br />
                            <Text code>{`<details class="custom-box">
    <summary style="background: #f0f0f0; padding: 8px; cursor: pointer;">
        Click to Toggle
    </summary>
    <div style="padding: 15px; border: 1px solid #ddd;">
        Your content here
    </div>
</details>`}</Text>
                            <br />
                            <details>
                                <summary style={{background: '#f0f0f0', padding: '8px', cursor: 'pointer'}}>
                                    Click to Toggle
                                </summary>
                                <div style={{padding: '15px', border: '1px solid #ddd'}}>
                                    Your content here
                                </div>
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Best Practices</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Structure:</Text> 
                            Keep the hierarchy logical and not too deeply nested
                        </li>
                        <li>
                            <Text strong>Summary Text:</Text> 
                            Use clear and descriptive summary text to indicate the content
                        </li>
                        <li>
                            <Text strong>Formatting:</Text> 
                            Maintain consistent indentation for nested content
                        </li>
                    </ul>
                </Paragraph>

                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
            </>
        ),
    },

    'collapsible-box-in-markdown': {
        title: "How to make box item collapsable in markdown?",
        description: 'Learn how to create collapsible boxes and containers in Markdown',
        keywords: 'markdown collapsible box, markdown dropdown box, markdown container, markdown box styling',
        content: (
            <>
                <Paragraph className="text-lg">
                    Creating collapsible boxes in Markdown helps organize and present content effectively. Here are several methods to create collapsible boxes:
                </Paragraph>
                
                <Title level={2}>Basic Collapsible Box</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Simple Box Style:</Text>
                            <br />
                            <Text code>{`<details style="border: 1px solid #aaa; padding: 10px; border-radius: 4px;">
    <summary style="cursor: pointer; font-weight: bold;">
        Click to Expand Box
    </summary>
    <div style="margin-top: 10px;">
        This is the box content
    </div>
</details>`}</Text>
                            <br />
                            <details style={{border: '1px solid #aaa', padding: '10px', borderRadius: '4px'}}>
                                <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>
                                    Click to Expand Box
                                </summary>
                                <div style={{marginTop: '10px'}}>
                                    This is the box content
                                </div>
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Advanced Styled Box</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Box with Shadow and Effects:</Text>
                            <br />
                            <Text code>{`<details style="
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 10px 0;
">
    <summary style="
        cursor: pointer;
        padding: 8px;
        background: #f5f5f5;
        border-radius: 4px;
        font-weight: bold;
    ">
        Advanced Style Box
    </summary>
    <div style="
        padding: 15px;
        margin-top: 10px;
        background: #fff;
        border-radius: 4px;
    ">
        Content with enhanced styling and shadow effects
    </div>
</details>`}</Text>
                            <br />
                            <details style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                margin: '10px 0'
                            }}>
                                <summary style={{
                                    cursor: 'pointer',
                                    padding: '8px',
                                    background: '#f5f5f5',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                }}>
                                    Advanced Style Box
                                </summary>
                                <div style={{
                                    padding: '15px',
                                    marginTop: '10px',
                                    background: '#fff',
                                    borderRadius: '4px'
                                }}>
                                    Content with enhanced styling and shadow effects
                                </div>
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Info Type Boxes</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Different Info Box Types:</Text>
                            <br />
                            <Text code>{`<details style="
    border-left: 4px solid #2196F3;
    background: #E3F2FD;
    padding: 15px;
    margin: 10px 0;
">
    <summary style="color: #1976D2; font-weight: bold;">
        Information Box
    </summary>
    <div style="margin-top: 10px;">
        This is an information box content
    </div>
</details>`}</Text>
                            <br />
                            <details style={{
                                borderLeft: '4px solid #2196F3',
                                background: '#E3F2FD',
                                padding: '15px',
                                margin: '10px 0'
                            }}>
                                <summary style={{color: '#1976D2', fontWeight: 'bold'}}>
                                    Information Box
                                </summary>
                                <div style={{marginTop: '10px'}}>
                                    This is an information box content
                                </div>
                            </details>
                        </li>
                    </ul>
                </Paragraph>

                <Title level={2}>Best Practices</Title>
                <Paragraph>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <Text strong>Style Consistency:</Text> 
                            Maintain consistent box styles throughout your document
                        </li>
                        <li>
                            <Text strong>Content Organization:</Text> 
                            Use appropriate box types for different content categories
                        </li>
                        <li>
                            <Text strong>Accessibility:</Text> 
                            Ensure proper color contrast for better readability
                        </li>
                    </ul>
                </Paragraph>

                <Divider />
                <div className="mt-8">
                    <ConverterCard />
                </div>
            </>
        ),
    },
};

export default function QuestionPage({ params }: { params: { slug: string } }) {
    const isLoading = usePageLoading();
    const questionData = questionsData[params.slug];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!questionData) {
        return (
            <div className="container mx-auto p-4 max-w-4xl">
                <Title level={1}>Question Not Found</Title>
                <Link href="/">
                    <Button type="primary">Back to Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="container mx-auto p-4 max-w-4xl">
            <Link href="/" className="flex items-center text-blue-500 mb-6 hover:underline">
                <ArrowLeftOutlined className="mr-1"/> Back to Home
            </Link>

            <Typography>
                <Title level={1}>{questionData.title}</Title>
                <Paragraph className="text-lg text-gray-600 mb-8">
                    {questionData.description}
                </Paragraph>

                <div className="prose prose-slate max-w-none">
                    {questionData.content}
                </div>
            </Typography>
        </article>
    );
}