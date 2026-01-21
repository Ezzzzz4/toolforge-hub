"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function UrlEncoderPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const process = () => {
        setError("");
        try {
            if (mode === "encode") {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (e) {
            setError("Invalid input for decoding");
            setOutput("");
        }
    };

    const encodeAll = () => {
        // Encode everything including special URL characters
        setOutput(encodeURIComponent(input).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()));
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    return (
        <ToolLayout
            slug="url-encoder"
            title="URL Encoder & Decoder"
            description="Encode or decode URLs and query strings. Handle special characters safely for use in URLs."
            howToUse={[
                "Enter the text or URL to encode/decode",
                "Choose Encode or Decode mode",
                "Click Process to convert",
            ]}
            faq={[
                {
                    question: "What is URL encoding?",
                    answer: "URL encoding converts special characters to a format that can be safely transmitted in URLs. For example, spaces become %20 or +.",
                },
                {
                    question: "When should I use URL encoding?",
                    answer: "Use URL encoding when including user input in URLs, building query strings, or when special characters need to be passed through URLs.",
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
                        {mode === "encode" ? "Text to Encode" : "URL to Decode"}
                    </label>
                    <textarea
                        id="input"
                        className={`textarea ${error ? "input-error" : ""}`}
                        placeholder={mode === "encode" ? "Hello World!" : "%48%65%6c%6c%6f"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Controls */}
                <div className="action-row mb-4">
                    <button onClick={process} className="btn btn-primary">
                        {mode === "encode" ? "Encode" : "Decode"}
                    </button>
                    {mode === "encode" && (
                        <button onClick={encodeAll} className="btn btn-secondary">
                            Encode All Characters
                        </button>
                    )}
                    <button onClick={clearAll} className="btn btn-ghost">
                        Clear
                    </button>
                </div>

                {/* Output */}
                <div>
                    <label className="label">Result</label>
                    <div style={{ position: "relative" }}>
                        <pre className="code-output">{output}</pre>
                        {output && <CopyButton text={output} className="copy-btn" />}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
