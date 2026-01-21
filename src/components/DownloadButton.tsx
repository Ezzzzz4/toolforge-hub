"use client";

interface DownloadButtonProps {
    content: string;
    filename: string;
    mimeType?: string;
    disabled?: boolean;
}

export default function DownloadButton({
    content,
    filename,
    mimeType = "text/plain",
    disabled = false,
}: DownloadButtonProps) {
    const handleDownload = () => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className="btn btn-secondary"
            disabled={disabled || !content}
            title={`Download as ${filename}`}
        >
            ⬇️ Download
        </button>
    );
}
