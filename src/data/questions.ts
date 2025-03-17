import { Typography, Divider } from 'antd';
import ConverterCard from '@/components/ConverterCard';

const { Title, Paragraph, Text } = Typography;

// 问题内容接口
export interface QuestionContent {
    title: string;
    description: string;
    keywords: string;
    contentHtml?: string; // 使用HTML字符串而不是React节点
}

// 问题数据
// 问题数据使用纯文本/HTML
export const questionsData: Record<string, QuestionContent> = {
    'underline-in-markdown': {
        title: "How to underline in markdown?",
        description: 'Learn different ways to create underlined text in Markdown documents',
        keywords: '',
        contentHtml: `
            <p class="text-lg">
                There are several methods to create underlined text in Markdown. Since native Markdown syntax doesn't directly support underlining, we need to use alternative approaches:
            </p>
            
            <h3>Using HTML Tags</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li>
                    <strong>&lt;u&gt; Tag:</strong> The most direct way is using HTML's u tag
                    <br />
                    <code>&lt;u&gt;This is underlined text&lt;/u&gt;</code>
                    <br />
                    <u>Example: This is underlined text</u>
                </li>
                <li>
                    <strong>&lt;ins&gt; Tag:</strong> Represents inserted text, also displays with underline
                    <br />
                    <code>&lt;ins&gt;This is inserted text&lt;/ins&gt;</code>
                    <br />
                    <ins>Example: This is inserted text</ins>
                </li>
            </ul>
            `

    },
    // 其他问题数据...
};
