// src/components/ErrorHandler.tsx
import React from 'react';
import { Alert, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface ErrorHandlerProps {
    error: Error | string | null;
    onRetry?: () => void;
    showRetry?: boolean;
}

/**
 * 错误处理组件
 * 用于显示友好的错误信息并提供重试选项
 */
const ErrorHandler: React.FC<ErrorHandlerProps> = ({
                                                       error,
                                                       onRetry,
                                                       showRetry = true
                                                   }) => {
    if (!error) return null;

    const errorMessage = typeof error === 'string' ? error : error.message;

    return (
        <Alert
            type="error"
            message="操作失败"
            description={
                <div>
                    <p>{errorMessage || '发生了未知错误'}</p>
                    {showRetry && onRetry && (
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={onRetry}
                            size="small"
                            className="mt-2"
                        >
                            重试
                        </Button>
                    )}
                </div>
            }
            showIcon
        />
    );
};

export default ErrorHandler;
