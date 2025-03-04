// src/components/FileUploader.tsx
import React, { useState, useEffect } from 'react';
import { Upload, Button, Typography, message } from 'antd';
import { UploadOutlined, FileMarkdownOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { isMarkdownFile, formatFileSize } from '@/utils/file';

const { Text } = Typography;

interface FileUploaderProps {
    onFileSelected: (file: RcFile) => void;
    disabled?: boolean;
}

/**
 * 文件上传组件
 * 专门用于Markdown文件的上传和预览
 */
const FileUploader: React.FC<FileUploaderProps> = ({
                                                       onFileSelected,
                                                       disabled = false
                                                   }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    // 当组件key变化时（重新渲染时）清空文件列表
    useEffect(() => {
        setFileList([]);
    }, []);

    // 上传文件前的验证
    const beforeUpload = (file: RcFile) => {
        // 验证文件类型
        if (!isMarkdownFile(file.name)) {
            messageApi.error('请上传Markdown格式的文件 (.md 或 .markdown)');
            return Upload.LIST_IGNORE;
        }

        // 验证文件大小（限制为10MB）
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            messageApi.error('文件大小不能超过10MB');
            return Upload.LIST_IGNORE;
        }

        // 更新文件列表并通知父组件
        setFileList([file]);
        onFileSelected(file);
        return false; // 阻止默认上传行为
    };

    // 移除文件的处理
    const handleRemove = () => {
        setFileList([]);
        // 通知父组件文件已被移除，传入null表示没有选中的文件
        onFileSelected(null as unknown as RcFile);
        return true;
    };

    // 上传组件的配置
    const uploadProps: UploadProps = {
        accept: '.md,.markdown',
        beforeUpload,
        onRemove: handleRemove,
        fileList,
        maxCount: 1,
        disabled,
        showUploadList: {
            showPreviewIcon: false,
            showDownloadIcon: false,
            showRemoveIcon: !disabled,
        },
        itemRender: (originNode, file) => (
            <div className="flex items-center justify-between p-2 border rounded mb-2">
                <div className="flex items-center">
                    <FileMarkdownOutlined className="text-blue-500 mr-2 text-xl" />
                    <div>
                        <div>{file.name}</div>
                        <Text type="secondary" className="text-xs">
                            {formatFileSize(file.size || 0)}
                        </Text>
                    </div>
                </div>
                {!disabled && (
                    <Button
                        size="small"
                        danger
                        onClick={() => handleRemove()}
                    >
                        移除
                    </Button>
                )}
            </div>
        ),
    };

    return (
        <div>
            {contextHolder}
            <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">仅支持 .md 和 .markdown 格式文件 (最大10MB)</p>
            </Upload.Dragger>
        </div>
    );
};

export default FileUploader;
