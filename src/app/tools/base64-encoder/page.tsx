"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function Base64EncoderPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const process = () => {
        setError("");
        try {
            if (mode === "encode") {
                // Handle Unicode properly
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                // Decode
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
        } catch (e) {
            setError(mode === "decode" ? "Invalid Base64 string" : "Encoding failed");
            setOutput("");
        }
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    const swapInputOutput = () => {
        setInput(output);
        setOutput("");
        setMode(mode === "encode" ? "decode" : "encode");
        setError("");
    };

    return (
        <ToolLayout
            slug="base64-encoder"
            title="Base64 Encoder & Decoder"
            description="Encode text to Base64 or decode Base64 strings instantly. Supports Unicode characters."
            howToUse={[
                "Enter your text or Base64 string in the input field",
                "Select 'Encode' or 'Decode' mode",
                "Click the process button to convert",
                "Copy the result with one click",
            ]}
            faq={[
                {
                    question: "What is Base64?",
                    answer: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format. It's commonly used in email, URLs, and data storage.",
                },
                {
                    question: "Does this support Unicode?",
                    answer: "Yes! Our encoder properly handles Unicode characters including emojis and non-Latin scripts.",
                },
            ]}
        >
            <div className="card">
                {/* Mode Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${mode === "encode" ? "active" : ""}`}
                        onClick={() => setMode("encode")}
                    >
                        Encode
                    </button>
                    <button
                        className={`tab ${mode === "decode" ? "active" : ""}`}
                        onClick={() => setMode("decode")}
                    >
                        Decode
                    </button>
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="input" className="label">
                        {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                    </label>
                    <textarea
                        id="input"
                        className={`textarea ${mode === "decode" ? "textarea-mono" : ""} ${error ? "input-error" : ""}`}
                        placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={5}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Controls */}
                <div className="action-row mb-4">
                    <button onClick={process} className="btn btn-primary">
                        {mode === "encode" ? "Encode" : "Decode"}
                    </button>
                    <button onClick={swapInputOutput} className="btn btn-secondary" disabled={!output}>
                        ⇅ Swap
                    </button>
                    <button onClick={clearAll} className="btn btn-ghost">
                        Clear
                    </button>
                </div>

                {/* Output */}
                <div>
                    <label className="label">Result</label>
                    <div style={{ position: "relative" }}>
                        <pre className={`code-output ${mode === "encode" ? "text-mono" : ""}`}>{output}</pre>
                        {output && <CopyButton text={output} className="copy-btn" />}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
