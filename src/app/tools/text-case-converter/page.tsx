"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

type CaseType =
    | "uppercase"
    | "lowercase"
    | "titlecase"
    | "sentencecase"
    | "camelcase"
    | "pascalcase"
    | "snakecase"
    | "kebabcase"
    | "dotcase"
    | "constantcase"
    | "alternating"
    | "inverse";

const caseOptions: { value: CaseType; label: string }[] = [
    { value: "uppercase", label: "UPPERCASE" },
    { value: "lowercase", label: "lowercase" },
    { value: "titlecase", label: "Title Case" },
    { value: "sentencecase", label: "Sentence case" },
    { value: "camelcase", label: "camelCase" },
    { value: "pascalcase", label: "PascalCase" },
    { value: "snakecase", label: "snake_case" },
    { value: "kebabcase", label: "kebab-case" },
    { value: "dotcase", label: "dot.case" },
    { value: "constantcase", label: "CONSTANT_CASE" },
    { value: "alternating", label: "aLtErNaTiNg" },
    { value: "inverse", label: "iNVERSE cASE" },
];

function convertCase(text: string, caseType: CaseType): string {
    const words = text.toLowerCase().split(/[\s_\-\.]+/);

    switch (caseType) {
        case "uppercase":
            return text.toUpperCase();
        case "lowercase":
            return text.toLowerCase();
        case "titlecase":
            return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        case "sentencecase":
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        case "camelcase":
            return words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join("");
        case "pascalcase":
            return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
        case "snakecase":
            return words.join("_");
        case "kebabcase":
            return words.join("-");
        case "dotcase":
            return words.join(".");
        case "constantcase":
            return words.join("_").toUpperCase();
        case "alternating":
            return text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
        case "inverse":
            return text.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
        default:
            return text;
    }
}

export default function TextCaseConverterPage() {
    const [input, setInput] = useState("");

    return (
        <ToolLayout
            slug="text-case-converter"
            title="Text Case Converter"
            description="Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more."
            howToUse={[
                "Enter or paste your text in the input field",
                "Click any case button to convert",
                "Copy the result with one click",
            ]}
            faq={[
                {
                    question: "What cases are supported?",
                    answer: "We support 12 different cases including uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, dot.case, CONSTANT_CASE, alternating, and inverse.",
                },
                {
                    question: "What is camelCase vs PascalCase?",
                    answer: "camelCase starts with lowercase (likeThis), while PascalCase starts with uppercase (LikeThis). Both are common in programming.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="text-input" className="label">
                        Enter Text
                    </label>
                    <textarea
                        id="text-input"
                        className="textarea"
                        placeholder="Type or paste your text here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Case Options */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                    {caseOptions.map((opt) => {
                        const converted = input ? convertCase(input, opt.value) : opt.label;
                        return (
                            <div
                                key={opt.value}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem",
                                    backgroundColor: "var(--color-bg-tertiary)",
                                    borderRadius: "var(--radius-md)",
                                }}
                            >
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
                                        {opt.label}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.875rem",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {converted}
                                    </div>
                                </div>
                                <CopyButton text={converted} />
                            </div>
                        );
                    })}
                </div>

                {!input && (
                    <p style={{ textAlign: "center", marginTop: "1rem", color: "var(--color-text-muted)" }}>
                        Enter text above to see conversions
                    </p>
                )}
            </div>
        </ToolLayout>
    );
}
