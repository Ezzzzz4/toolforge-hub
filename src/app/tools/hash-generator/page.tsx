"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function HashGeneratorPage() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<Record<string, string>>({});

    const generateHashes = () => {
        if (!input) return;

        setHashes({
            MD5: CryptoJS.MD5(input).toString(),
            "SHA-1": CryptoJS.SHA1(input).toString(),
            "SHA-256": CryptoJS.SHA256(input).toString(),
            "SHA-512": CryptoJS.SHA512(input).toString(),
        });
    };

    const clearAll = () => {
        setInput("");
        setHashes({});
    };

    return (
        <ToolLayout
            slug="hash-generator"
            title="Hash Generator"
            description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly."
            howToUse={[
                "Enter the text you want to hash",
                "Click 'Generate Hashes'",
                "All hash types are calculated at once",
                "Copy any hash with one click",
            ]}
            faq={[
                {
                    question: "What is a hash?",
                    answer: "A hash is a fixed-size string generated from input data. The same input always produces the same hash, but you cannot reverse it to get the original data.",
                },
                {
                    question: "Which hash should I use?",
                    answer: "For security purposes, use SHA-256 or SHA-512. MD5 and SHA-1 are considered weak for security but still useful for checksums.",
                },
                {
                    question: "Can hashes be reversed?",
                    answer: "No, hash functions are one-way. You cannot recover the original text from a hash.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="hash-input" className="label">
                        Text to Hash
                    </label>
                    <textarea
                        id="hash-input"
                        className="textarea"
                        placeholder="Enter text to generate hashes..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Controls */}
                <div className="action-row mb-6">
                    <button onClick={generateHashes} className="btn btn-primary btn-lg" disabled={!input}>
                        Generate Hashes
                    </button>
                    <button onClick={clearAll} className="btn btn-ghost">
                        Clear
                    </button>
                </div>

                {/* Results */}
                {Object.keys(hashes).length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {Object.entries(hashes).map(([type, hash]) => (
                            <div key={type}>
                                <label className="label">{type}</label>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        backgroundColor: "var(--color-bg-tertiary)",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "var(--radius-md)",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.75rem",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    <span style={{ flex: 1 }}>{hash}</span>
                                    <CopyButton text={hash} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {Object.keys(hashes).length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "2rem",
                            color: "var(--color-text-muted)",
                        }}
                    >
                        Enter text and click &quot;Generate Hashes&quot; to see results
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
