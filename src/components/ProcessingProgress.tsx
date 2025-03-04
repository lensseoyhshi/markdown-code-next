// src/components/ProcessingProgress.tsx
import React from 'react';
import { Progress, Card, Typography, Spin, Steps } from 'antd';
import { LoadingOutlined, CheckCircleOutlined, FileMarkdownOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Step } = Steps;

interface ProcessingProgressProps {
    progress: number;
    fileName: string;
}

/**
 * 处理进度组件
 * 展示文件处理的实时进度和状态
 */
const ProcessingProgress: React.FC<ProcessingProgressProps> = ({ progress, fileName }) => {
    // 定义处理步骤
    const steps = [
        { title: '上传文件', description: '正在上传Markdown文件' },
        { title: '解析内容', description: '解析Markdown内容结构' },
        { title: '转换格式', description: '转换为HTML格式' },
        { title: '生成文件', description: '生成最终HTML文件' },
    ];

    // 确定当前处于哪个步骤
    let currentStep = 0;
    if (progress > 25) currentStep = 1;
    if (progress > 50) currentStep = 2;
    if (progress > 75) currentStep = 3;
    if (progress >= 100) currentStep = 4;

    // 进度状态
    const isCompleted = progress >= 100;
    const statusIcon = isCompleted ? (
        <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
    ) : (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
    );

    return (
        <Card className="mb-6">
            <div className="flex items-center mb-4">
                <div className="mr-3">{statusIcon}</div>
                <div>
                    <Title level={5} className="m-0">
                        {isCompleted ? '处理完成' : '正在处理中...'}
                    </Title>
                    <Text type="secondary">
                        {isCompleted
                            ? '您的Markdown文件已成功转换为HTML格式'
                            : `正在处理: ${fileName}`}
                    </Text>
                </div>
            </div>

            <Progress
                percent={progress}
                status={isCompleted ? "success" : "active"}
                strokeWidth={8}
            />

            <div className="mt-6">
                <Steps
                    current={currentStep}
                    size="small"
                    responsive
                    items={steps.map((step, index) => ({
                        title: step.title,
                        description: step.description,
                        status: index < currentStep ? 'finish' : (index === currentStep && !isCompleted ? 'process' : 'wait'),
                        icon: index === 0
                            ? <FileMarkdownOutlined />
                            : (index === steps.length - 1 ? <FileTextOutlined /> : undefined)
                    }))}
                />
            </div>
        </Card>
    );
};

export default ProcessingProgress;
