"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function JsonFormatterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [indentSize, setIndentSize] = useState(2);

    const formatJson = () => {
        setError("");
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Invalid JSON");
            setOutput("");
        }
    };

    const minifyJson = () => {
        setError("");
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Invalid JSON");
            setOutput("");
        }
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    const loadSample = () => {
        const sample = {
            name: "John Doe",
            age: 30,
            email: "john@example.com",
            address: {
                street: "123 Main St",
                city: "New York",
                country: "USA"
            },
            hobbies: ["reading", "coding", "gaming"]
        };
        setInput(JSON.stringify(sample));
        setError("");
    };

    return (
        <ToolLayout
            slug="json-formatter"
            title="JSON Formatter & Validator"
            description="Format, beautify, validate, and minify JSON data instantly. Free online JSON formatter with syntax highlighting."
            howToUse={[
                "Paste your JSON data in the input field",
                "Click 'Format' to beautify or 'Minify' to compress",
                "Copy the formatted result with one click",
            ]}
            faq={[
                {
                    question: "What is JSON?",
                    answer: "JSON (JavaScript Object Notation) is a lightweight data format used for storing and transporting data. It's commonly used for APIs and configuration files.",
                },
                {
                    question: "Is my data secure?",
                    answer: "Yes! All processing happens directly in your browser. Your data is never sent to any server.",
                },
                {
                    question: "What's the difference between format and minify?",
                    answer: "Format adds indentation and line breaks for readability. Minify removes all unnecessary whitespace to reduce file size.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="json-input" className="label">
                        Input JSON
                    </label>
                    <textarea
                        id="json-input"
                        className={`textarea textarea-mono ${error ? "input-error" : ""}`}
                        placeholder='{"name": "value"}'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={8}
                    />
                    {error && <p className="error-message">Error: {error}</p>}
                </div>

                {/* Controls */}
                <div className="action-row mb-4">
                    <button onClick={formatJson} className="btn btn-primary">
                        Format
                    </button>
                    <button onClick={minifyJson} className="btn btn-secondary">
                        Minify
                    </button>
                    <button onClick={clearAll} className="btn btn-ghost">
                        Clear
                    </button>
                    <button onClick={loadSample} className="btn btn-ghost">
                        Load Sample
                    </button>

                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <label htmlFor="indent" className="label" style={{ margin: 0, fontSize: "0.875rem" }}>
                            Indent:
                        </label>
                        <select
                            id="indent"
                            className="select"
                            style={{ width: "auto", padding: "0.5rem" }}
                            value={indentSize}
                            onChange={(e) => setIndentSize(Number(e.target.value))}
                        >
                            <option value={2}>2 spaces</option>
                            <option value={4}>4 spaces</option>
                            <option value={1}>1 tab</option>
                        </select>
                    </div>
                </div>

                {/* Output */}
                <div>
                    <label className="label">Output</label>
                    <div style={{ position: "relative" }}>
                        <pre className="code-output">{output}</pre>
                        {output && <CopyButton text={output} className="copy-btn" />}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
