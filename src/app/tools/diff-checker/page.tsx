"use client";

import { useState, useMemo } from "react";
import * as Diff from "diff";
import ToolLayout from "@/components/ToolLayout";

export default function DiffCheckerPage() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [diffType, setDiffType] = useState<"chars" | "words" | "lines">("lines");

    const differences = useMemo(() => {
        if (!text1 && !text2) return [];

        switch (diffType) {
            case "chars":
                return Diff.diffChars(text1, text2);
            case "words":
                return Diff.diffWords(text1, text2);
            case "lines":
            default:
                return Diff.diffLines(text1, text2);
        }
    }, [text1, text2, diffType]);

    const stats = useMemo(() => {
        let added = 0;
        let removed = 0;
        differences.forEach((part) => {
            if (part.added) added += part.value.length;
            if (part.removed) removed += part.value.length;
        });
        return { added, removed };
    }, [differences]);

    const loadSample = () => {
        setText1(`function greet(name) {
  console.log("Hello, " + name);
  return name;
}`);
        setText2(`function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return { name, greeting };
}`);
    };

    return (
        <ToolLayout
            slug="diff-checker"
            title="Text Diff Checker"
            description="Compare two texts and see the differences highlighted. Find changes between versions of code, documents, or any text."
            howToUse={[
                "Paste your original text on the left",
                "Paste the modified text on the right",
                "Differences are highlighted automatically",
            ]}
            faq={[
                {
                    question: "What comparison modes are available?",
                    answer: "You can compare by characters (most detailed), words (balanced), or lines (best for code).",
                },
                {
                    question: "What do the colors mean?",
                    answer: "Green highlighting shows additions (new text), red shows deletions (removed text), and unchanged text has no highlight.",
                },
            ]}
        >
            <div className="card">
                {/* Diff Type Selection */}
                <div className="mb-4">
                    <label className="label">Compare By</label>
                    <div className="action-row">
                        {(["lines", "words", "chars"] as const).map((type) => (
                            <button
                                key={type}
                                className={`btn ${diffType === type ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setDiffType(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                        <button onClick={loadSample} className="btn btn-ghost" style={{ marginLeft: "auto" }}>
                            Load Sample
                        </button>
                    </div>
                </div>

                {/* Input Panels */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                        <label htmlFor="text1" className="label">Original Text</label>
                        <textarea
                            id="text1"
                            className="textarea textarea-mono"
                            placeholder="Paste original text here..."
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            rows={8}
                        />
                    </div>
                    <div>
                        <label htmlFor="text2" className="label">Modified Text</label>
                        <textarea
                            id="text2"
                            className="textarea textarea-mono"
                            placeholder="Paste modified text here..."
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            rows={8}
                        />
                    </div>
                </div>

                {/* Stats */}
                {(text1 || text2) && (
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
                        <span style={{ color: "var(--color-success)" }}>+{stats.added} added</span>
                        <span style={{ color: "var(--color-error)" }}>-{stats.removed} removed</span>
                    </div>
                )}

                {/* Diff Output */}
                <div>
                    <label className="label">Differences</label>
                    <div
                        style={{
                            backgroundColor: "var(--color-bg-tertiary)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius-lg)",
                            padding: "1rem",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            lineHeight: "1.6",
                            minHeight: "150px",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        {differences.length === 0 ? (
                            <span style={{ color: "var(--color-text-muted)" }}>
                                Enter text in both fields to see differences...
                            </span>
                        ) : (
                            differences.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        backgroundColor: part.added
                                            ? "rgba(34, 197, 94, 0.2)"
                                            : part.removed
                                                ? "rgba(239, 68, 68, 0.2)"
                                                : "transparent",
                                        textDecoration: part.removed ? "line-through" : "none",
                                        color: part.added
                                            ? "var(--color-success)"
                                            : part.removed
                                                ? "var(--color-error)"
                                                : "inherit",
                                    }}
                                >
                                    {part.value}
                                </span>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
