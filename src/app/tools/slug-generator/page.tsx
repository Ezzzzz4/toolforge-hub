"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function SlugGeneratorPage() {
    const [input, setInput] = useState("");
    const [slug, setSlug] = useState("");
    const [separator, setSeparator] = useState("-");
    const [lowercase, setLowercase] = useState(true);

    useEffect(() => {
        let result = input
            // Remove accents/diacritics
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            // Replace spaces and special chars with separator
            .replace(/[^a-zA-Z0-9]+/g, separator)
            // Remove leading/trailing separators
            .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

        if (lowercase) {
            result = result.toLowerCase();
        }

        setSlug(result);
    }, [input, separator, lowercase]);

    const loadSamples = () => {
        setInput("Hello World! This is a Sample Title 2026");
    };

    return (
        <ToolLayout
            slug="slug-generator"
            title="Slug Generator"
            description="Generate URL-friendly slugs from any text. Perfect for blog posts, product pages, and SEO-friendly URLs."
            howToUse={[
                "Enter your title or text",
                "Choose separator (dash or underscore)",
                "Copy the generated slug",
            ]}
            faq={[
                {
                    question: "What is a slug?",
                    answer: "A slug is the URL-friendly version of a title. For example, 'Hello World' becomes 'hello-world'. Slugs are used in blog URLs, product pages, and more.",
                },
                {
                    question: "Which separator should I use?",
                    answer: "Dashes (-) are recommended for SEO as search engines treat them as word separators. Underscores (_) are common in programming contexts.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="input" className="label">
                        Enter Title or Text
                    </label>
                    <input
                        id="input"
                        type="text"
                        className="input"
                        placeholder="My Awesome Blog Post Title!"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                {/* Options */}
                <div className="mb-4" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <div>
                        <label className="label">Separator</label>
                        <div className="action-row">
                            <button
                                className={`btn ${separator === "-" ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setSeparator("-")}
                            >
                                Dash (-)
                            </button>
                            <button
                                className={`btn ${separator === "_" ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setSeparator("_")}
                            >
                                Underscore (_)
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="label">Case</label>
                        <div className="action-row">
                            <button
                                className={`btn ${lowercase ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setLowercase(true)}
                            >
                                lowercase
                            </button>
                            <button
                                className={`btn ${!lowercase ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setLowercase(false)}
                            >
                                Preserve Case
                            </button>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="mb-4">
                    <label className="label">Generated Slug</label>
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            className="input input-mono"
                            value={slug}
                            readOnly
                            placeholder="your-slug-will-appear-here"
                            style={{ paddingRight: "3rem" }}
                        />
                        {slug && <CopyButton text={slug} className="copy-btn" />}
                    </div>
                </div>

                {/* URL Preview */}
                {slug && (
                    <div
                        style={{
                            padding: "1rem",
                            backgroundColor: "var(--color-bg-tertiary)",
                            borderRadius: "var(--radius-md)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            color: "var(--color-text-secondary)",
                        }}
                    >
                        <span style={{ color: "var(--color-text-muted)" }}>https://example.com/blog/</span>
                        <span style={{ color: "var(--color-primary)" }}>{slug}</span>
                    </div>
                )}

                <button onClick={loadSamples} className="btn btn-ghost" style={{ marginTop: "1rem" }}>
                    Load Sample
                </button>
            </div>
        </ToolLayout>
    );
}
