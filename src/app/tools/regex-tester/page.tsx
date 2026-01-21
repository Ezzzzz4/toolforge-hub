"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

const commonPatterns = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { name: "URL", pattern: "https?:\\/\\/[\\w\\-._~:\\/?#\\[\\]@!$&'()*+,;=%]+" },
    { name: "Phone", pattern: "\\+?\\d{1,4}[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}" },
    { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
    { name: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
    { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
];

export default function RegexTesterPage() {
    const [pattern, setPattern] = useState("");
    const [testString, setTestString] = useState("");
    const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
    const [error, setError] = useState("");

    const flagString = Object.entries(flags)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join("");

    const result = useMemo(() => {
        if (!pattern || !testString) return { matches: [], highlighted: testString };

        try {
            setError("");
            const regex = new RegExp(pattern, flagString);
            const matches: { match: string; index: number; groups?: string[] }[] = [];

            let match;
            if (flags.g) {
                while ((match = regex.exec(testString)) !== null) {
                    matches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1).length > 0 ? match.slice(1) : undefined,
                    });
                    if (match.index === regex.lastIndex) regex.lastIndex++;
                }
            } else {
                match = regex.exec(testString);
                if (match) {
                    matches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1).length > 0 ? match.slice(1) : undefined,
                    });
                }
            }

            // Create highlighted string
            let highlighted = testString;
            let offset = 0;
            const sortedMatches = [...matches].sort((a, b) => a.index - b.index);
            sortedMatches.forEach((m) => {
                const start = m.index + offset;
                const end = start + m.match.length;
                const before = highlighted.slice(0, start);
                const matched = highlighted.slice(start, end);
                const after = highlighted.slice(end);
                highlighted = before + `<mark>${matched}</mark>` + after;
                offset += 13; // <mark></mark> length
            });

            return { matches, highlighted };
        } catch (e) {
            setError(e instanceof Error ? e.message : "Invalid regex");
            return { matches: [], highlighted: testString };
        }
    }, [pattern, testString, flagString, flags.g]);

    const applyPattern = (p: string) => {
        setPattern(p);
    };

    return (
        <ToolLayout
            slug="regex-tester"
            title="Regex Tester & Debugger"
            description="Test and debug regular expressions in real-time. See matches highlighted and capture groups extracted."
            howToUse={[
                "Enter your regex pattern in the pattern field",
                "Set the flags you need (global, case-insensitive, etc.)",
                "Enter your test string",
                "Matches are highlighted in real-time",
            ]}
            faq={[
                {
                    question: "What regex flavor is used?",
                    answer: "We use JavaScript's built-in RegExp, which is similar to PCRE but with some differences.",
                },
                {
                    question: "What do the flags mean?",
                    answer: "g = global (find all matches), i = case insensitive, m = multiline (^ and $ match line boundaries), s = dotAll (. matches newlines)",
                },
            ]}
        >
            <div className="card">
                {/* Pattern Input */}
                <div className="mb-4">
                    <label htmlFor="pattern" className="label">
                        Regular Expression
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem", color: "var(--color-text-muted)" }}>/</span>
                        <input
                            id="pattern"
                            type="text"
                            className={`input input-mono ${error ? "input-error" : ""}`}
                            placeholder="Enter regex pattern..."
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <span style={{ fontSize: "1.25rem", color: "var(--color-text-muted)" }}>/{flagString}</span>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Flags */}
                <div className="mb-4">
                    <label className="label">Flags</label>
                    <div className="checkbox-group">
                        {Object.entries({ g: "Global", i: "Case Insensitive", m: "Multiline", s: "DotAll" }).map(
                            ([key, label]) => (
                                <label key={key} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={flags[key as keyof typeof flags]}
                                        onChange={(e) => setFlags({ ...flags, [key]: e.target.checked })}
                                    />
                                    {label} ({key})
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* Common Patterns */}
                <div className="mb-4">
                    <label className="label">Common Patterns</label>
                    <div className="action-row">
                        {commonPatterns.map((p) => (
                            <button
                                key={p.name}
                                className="btn btn-ghost"
                                onClick={() => applyPattern(p.pattern)}
                                style={{ fontSize: "0.75rem" }}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Test String */}
                <div className="mb-4">
                    <label htmlFor="test-string" className="label">
                        Test String
                    </label>
                    <textarea
                        id="test-string"
                        className="textarea"
                        placeholder="Enter text to test against..."
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        rows={5}
                    />
                </div>

                {/* Results */}
                <div className="mb-4">
                    <label className="label">Highlighted Result ({result.matches.length} match{result.matches.length !== 1 ? "es" : ""})</label>
                    <div
                        className="code-output"
                        style={{ whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{
                            __html: result.highlighted || '<span style="color: var(--color-text-muted)">Enter a pattern and test string to see results...</span>',
                        }}
                    />
                    <style jsx>{`
            :global(mark) {
              background-color: #fef08a;
              color: #1e293b;
              padding: 0 2px;
              border-radius: 2px;
            }
          `}</style>
                </div>

                {/* Match Details */}
                {result.matches.length > 0 && (
                    <div>
                        <label className="label">Match Details</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {result.matches.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        gap: "1rem",
                                        padding: "0.75rem",
                                        backgroundColor: "var(--color-bg-tertiary)",
                                        borderRadius: "var(--radius-md)",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    <span style={{ color: "var(--color-text-muted)" }}>#{i + 1}</span>
                                    <code style={{ flex: 1 }}>&quot;{m.match}&quot;</code>
                                    <span style={{ color: "var(--color-text-muted)" }}>at index {m.index}</span>
                                    {m.groups && (
                                        <span style={{ color: "var(--color-primary)" }}>
                                            groups: [{m.groups.map((g) => `"${g}"`).join(", ")}]
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
