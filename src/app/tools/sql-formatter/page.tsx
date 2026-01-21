"use client";

import { useState } from "react";
import { format } from "sql-formatter";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";
import DownloadButton from "@/components/DownloadButton";

export default function SqlFormatterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [dialect, setDialect] = useState<"sql" | "mysql" | "postgresql" | "sqlite">("sql");

    const formatSql = () => {
        setError("");
        try {
            const formatted = format(input, {
                language: dialect,
                tabWidth: 2,
                keywordCase: "upper",
                linesBetweenQueries: 2,
            });
            setOutput(formatted);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to format SQL");
        }
    };

    const minifySql = () => {
        setError("");
        try {
            // Simple minification - remove extra whitespace
            const minified = input
                .replace(/\s+/g, " ")
                .replace(/\s*([,();])\s*/g, "$1")
                .trim();
            setOutput(minified);
        } catch (e) {
            setError("Failed to minify SQL");
        }
    };

    const loadSample = () => {
        setInput(`select users.name, orders.total, products.title from users inner join orders on users.id = orders.user_id inner join order_items on orders.id = order_items.order_id inner join products on order_items.product_id = products.id where orders.created_at > '2026-01-01' and orders.total > 100 order by orders.total desc limit 10;`);
    };

    return (
        <ToolLayout
            slug="sql-formatter"
            title="SQL Formatter & Beautifier"
            description="Format and beautify SQL queries with proper indentation. Supports MySQL, PostgreSQL, SQLite, and standard SQL."
            howToUse={[
                "Paste your SQL query in the input area",
                "Choose your SQL dialect",
                "Click Format to beautify or Minify to compress",
            ]}
            faq={[
                {
                    question: "Which SQL dialects are supported?",
                    answer: "We support standard SQL, MySQL, PostgreSQL, and SQLite. The formatter handles dialect-specific syntax.",
                },
                {
                    question: "Does this validate my SQL?",
                    answer: "This tool focuses on formatting. While it will catch basic syntax issues, it's not a full SQL validator.",
                },
            ]}
        >
            <div className="card">
                {/* Dialect Selection */}
                <div className="mb-4">
                    <label className="label">SQL Dialect</label>
                    <div className="action-row">
                        {(["sql", "mysql", "postgresql", "sqlite"] as const).map((d) => (
                            <button
                                key={d}
                                className={`btn ${dialect === d ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setDialect(d)}
                            >
                                {d === "sql" ? "Standard SQL" : d.charAt(0).toUpperCase() + d.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="sql-input" className="label">
                        SQL Query
                    </label>
                    <textarea
                        id="sql-input"
                        className={`textarea textarea-mono ${error ? "input-error" : ""}`}
                        placeholder="SELECT * FROM users WHERE id = 1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={6}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Actions */}
                <div className="action-row mb-4">
                    <button onClick={formatSql} className="btn btn-primary">
                        Format
                    </button>
                    <button onClick={minifySql} className="btn btn-secondary">
                        Minify
                    </button>
                    <button onClick={loadSample} className="btn btn-ghost">
                        Load Sample
                    </button>
                    <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="btn btn-ghost">
                        Clear
                    </button>
                </div>

                {/* Output */}
                <div>
                    <label className="label">Formatted SQL</label>
                    <div style={{ position: "relative" }}>
                        <pre className="code-output" style={{ minHeight: "150px" }}>{output}</pre>
                        {output && (
                            <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", display: "flex", gap: "0.25rem" }}>
                                <CopyButton text={output} />
                            </div>
                        )}
                    </div>
                    {output && (
                        <div style={{ marginTop: "0.5rem" }}>
                            <DownloadButton content={output} filename="query.sql" mimeType="application/sql" />
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
