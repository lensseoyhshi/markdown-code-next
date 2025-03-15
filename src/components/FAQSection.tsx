import { Card, Skeleton } from 'antd';
import { faqData } from '@/config/faq';
import { marked } from 'marked';  // 添加这行导入
// 定义 FAQ 数据类型
interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export default function FAQSection() {
    try {
        // 数据验证
        if (!Array.isArray(faqData)) {
            console.error('FAQ data is not an array');
            return null;
        }

        // 数据类型验证
        const isValidFAQItem = (item: any): item is FAQItem => {
            return (
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                typeof item.question === 'string' &&
                typeof item.answer === 'string'
            );
        };

        const validFaqData = faqData.filter(isValidFAQItem);

        if (validFaqData.length === 0) {
            return null;
        }

        return (
            <section className="mt-8" id="faq">
                <Card>
                    <div className="space-y-6">
                        {validFaqData.map((item) => (
                            <div key={item.id} className="faq-item">
                                <h3 className="text-lg font-bold">{item.question}</h3>
                                <p 
                                    className="text-gray-600 prose prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: marked.parse(item.answer) 
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            </section>
        );
    } catch (error) {
        console.error('Error rendering FAQ section:', error);
        return (
            <Card>
                <Skeleton active />
            </Card>
        );
    }
}