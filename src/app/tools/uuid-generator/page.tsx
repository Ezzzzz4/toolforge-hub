"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function UuidGeneratorPage() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(1);

    const generateUuids = () => {
        const newUuids: string[] = [];
        for (let i = 0; i < count; i++) {
            newUuids.push(uuidv4());
        }
        setUuids(newUuids);
    };

    const clearAll = () => {
        setUuids([]);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join("\n"));
    };

    return (
        <ToolLayout
            slug="uuid-generator"
            title="UUID Generator"
            description="Generate random UUIDs (v4) instantly. Create single or bulk UUIDs for your applications."
            howToUse={[
                "Select how many UUIDs you want to generate (1-100)",
                "Click 'Generate UUIDs'",
                "Copy individual UUIDs or copy all at once",
            ]}
            faq={[
                {
                    question: "What is a UUID?",
                    answer: "UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across all devices and time. Version 4 UUIDs are randomly generated.",
                },
                {
                    question: "Are these UUIDs unique?",
                    answer: "Yes! UUIDv4 uses cryptographically strong random values. The probability of generating a duplicate is astronomically low.",
                },
                {
                    question: "What format is used?",
                    answer: "We generate UUIDv4 in the standard format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
                },
            ]}
        >
            <div className="card">
                {/* Controls */}
                <div className="mb-4">
                    <label htmlFor="count" className="label">
                        Number of UUIDs
                    </label>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <input
                            id="count"
                            type="number"
                            className="input"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
                            style={{ width: "100px" }}
                        />
                        <button onClick={generateUuids} className="btn btn-primary btn-lg">
                            Generate UUIDs
                        </button>
                        {uuids.length > 0 && (
                            <>
                                <button onClick={copyAll} className="btn btn-secondary">
                                    Copy All
                                </button>
                                <button onClick={clearAll} className="btn btn-ghost">
                                    Clear
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Results */}
                {uuids.length > 0 && (
                    <div>
                        <label className="label">Generated UUIDs ({uuids.length})</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {uuids.map((uuid, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        backgroundColor: "var(--color-bg-tertiary)",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "var(--radius-md)",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    <span style={{ flex: 1 }}>{uuid}</span>
                                    <CopyButton text={uuid} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {uuids.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "3rem",
                            color: "var(--color-text-muted)",
                        }}
                    >
                        Click &quot;Generate UUIDs&quot; to create new unique identifiers
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
