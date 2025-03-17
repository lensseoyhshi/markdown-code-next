// app/questions/[slug]/page.tsx
import { Metadata } from 'next';
import QuestionClient from './QuestionClient';
import { questionsData } from '@/data/questions';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const question = questionsData[params.slug];

    if (!question) {
        return {
            title: 'Question Not Found',
            description: 'The requested question could not be found.'
        };
    }

    return {
        title: question.title,
        description: question.description,
        openGraph: {
            title: question.title,
            description: question.description,
            type: 'article'
        }
    };
}

export default function QuestionPage({ params }: { params: { slug: string } }) {
    const questionData = questionsData[params.slug];

    if (!questionData) {
        return (
            <div className="container mx-auto p-4 max-w-4xl">
                <h1 className="text-3xl font-bold">Question Not Found</h1>
                <a href="/" className="text-blue-500 hover:underline">Back to Home</a>
            </div>
        );
    }

    return <QuestionClient
        title={questionData.title}
        description={questionData.description}
        contentHtml={questionData.contentHtml || ""}
        slug={params.slug}
    />;
}
