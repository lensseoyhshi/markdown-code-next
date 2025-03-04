// src/services/api.ts
/**
 * API服务层，处理与后端的通信
 */

// API基础URL
const API_BASE_URL = 'http://localhost:7860';

/**
 * 上传Markdown文件并转换为HTML
 * @param file 要上传的文件
 * @param onProgressUpdate 进度更新回调函数
 * @returns 处理结果
 */
export const uploadMarkdownFile = async (
    file: File,
    onProgressUpdate?: (progress: number) => void
): Promise<{ code: string; out_path: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    // 为了模拟长连接的进度更新
    if (onProgressUpdate) {
        // 创建进度更新的模拟（实际应用中，这将通过SSE或WebSocket实现）
        const progressInterval = setInterval(() => {
            const progress = Math.floor(Math.random() * 30) + 10; // 模拟10-40%的进度
            onProgressUpdate(progress);
        }, 500);

        // 在3秒后清除定时器
        setTimeout(() => {
            clearInterval(progressInterval);
            onProgressUpdate(70); // 模拟70%进度

            // 再等1秒设为90%
            setTimeout(() => {
                onProgressUpdate(90);

                // 最后等1秒完成
                setTimeout(() => {
                    onProgressUpdate(100);
                }, 1000);
            }, 1000);
        }, 3000);
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || '上传失败');
    }

    return response.json();
};

/**
 * 下载转换后的HTML文件
 * @param filePath 文件路径
 * @returns Blob对象
 */
export const downloadFile = async (filePath: string): Promise<Blob> => {
    const response = await fetch(
        `${API_BASE_URL}/get-file?file_path=${encodeURIComponent(filePath)}`
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || '下载失败');
    }

    return response.blob();
};
