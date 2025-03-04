// src/utils/file.ts

/**
 * 检查文件是否为Markdown格式
 * @param fileName 文件名
 * @returns 是否为Markdown文件
 */
export const isMarkdownFile = (fileName: string): boolean => {
    const lowerCaseName = fileName.toLowerCase();
    return lowerCaseName.endsWith('.md') || lowerCaseName.endsWith('.markdown');
};

/**
 * 从文件路径中提取文件名
 * @param filePath 文件路径
 * @returns 文件名
 */
export const extractFileName = (filePath: string): string => {
    // 处理Windows和Unix风格的路径
    return filePath.split(/[/\\]/).pop() || 'file';
};

/**
 * 格式化文件大小
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 创建下载链接并触发下载
 * @param blob 文件Blob
 * @param fileName 下载文件名
 */
export const downloadBlob = (blob: Blob, fileName: string): void => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
