"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";

export default function QrCodeGeneratorPage() {
    const [text, setText] = useState("");
    const [size, setSize] = useState(256);
    const [qrDataUrl, setQrDataUrl] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (text && canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, text, {
                width: size,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            }).catch((err) => console.error(err));

            QRCode.toDataURL(text, { width: size, margin: 2 })
                .then((url) => setQrDataUrl(url))
                .catch((err) => console.error(err));
        }
    }, [text, size]);

    const downloadQr = () => {
        if (!qrDataUrl) return;
        const link = document.createElement("a");
        link.download = `qrcode-${size}x${size}.png`;
        link.href = qrDataUrl;
        link.click();
    };

    const clearAll = () => {
        setText("");
        setQrDataUrl("");
    };

    return (
        <ToolLayout
            slug="qr-code-generator"
            title="QR Code Generator"
            description="Generate QR codes from text or URLs for free. Download in various sizes."
            howToUse={[
                "Enter the text or URL you want to encode",
                "Choose your preferred size",
                "The QR code generates automatically",
                "Download the QR code as a PNG image",
            ]}
            faq={[
                {
                    question: "What can I encode in a QR code?",
                    answer: "You can encode any text, URLs, email addresses, phone numbers, Wi-Fi credentials, or vCard contact information.",
                },
                {
                    question: "What size should I use?",
                    answer: "256px is good for digital use. For printing, use 512px or larger depending on the print size.",
                },
                {
                    question: "Can I customize the colors?",
                    answer: "Currently we generate standard black and white QR codes which have the best scan reliability.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="qr-input" className="label">
                        Text or URL
                    </label>
                    <input
                        id="qr-input"
                        type="text"
                        className="input"
                        placeholder="Enter text or URL to encode..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                {/* Size Selection */}
                <div className="mb-4">
                    <label className="label">Size</label>
                    <div className="action-row">
                        {[128, 256, 512].map((s) => (
                            <button
                                key={s}
                                className={`btn ${size === s ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setSize(s)}
                            >
                                {s}×{s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* QR Code Display */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "2rem",
                        backgroundColor: "var(--color-bg-secondary)",
                        borderRadius: "var(--radius-lg)",
                        marginBottom: "1rem",
                    }}
                >
                    {text ? (
                        <canvas ref={canvasRef} style={{ borderRadius: "var(--radius-md)" }} />
                    ) : (
                        <div
                            style={{
                                width: size,
                                height: size,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "var(--color-bg-tertiary)",
                                borderRadius: "var(--radius-md)",
                                color: "var(--color-text-muted)",
                                textAlign: "center",
                                padding: "1rem",
                            }}
                        >
                            Enter text above to generate QR code
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="action-row">
                    <button
                        onClick={downloadQr}
                        className="btn btn-primary btn-lg"
                        disabled={!text}
                        style={{ flex: 1 }}
                    >
                        Download PNG
                    </button>
                    <button onClick={clearAll} className="btn btn-secondary">
                        Clear
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
}
