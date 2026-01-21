"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function WordCounterPage() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: "0 min",
    });

    useEffect(() => {
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
        const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;

        // Average reading speed: 200 words per minute
        const minutes = Math.ceil(words / 200);
        const readingTime = minutes < 1 ? "< 1 min" : `${minutes} min`;

        setStats({
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
            readingTime,
        });
    }, [text]);

    const clearText = () => setText("");

    const loadSample = () => {
        setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis!`);
    };

    return (
        <ToolLayout
            slug="word-counter"
            title="Word & Character Counter"
            description="Count words, characters, sentences, paragraphs, and estimate reading time. Perfect for essays, articles, and social media posts."
            howToUse={[
                "Type or paste your text in the input field",
                "Statistics update automatically as you type",
                "Use the results for essays, tweets, or any text with limits",
            ]}
            faq={[
                {
                    question: "How is reading time calculated?",
                    answer: "Reading time is estimated based on an average reading speed of 200 words per minute.",
                },
                {
                    question: "Are spaces counted in characters?",
                    answer: "We show both: total characters (including spaces) and characters without spaces.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="text-input" className="label">
                        Enter your text
                    </label>
                    <textarea
                        id="text-input"
                        className="textarea"
                        placeholder="Start typing or paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                    />
                </div>

                {/* Controls */}
                <div className="action-row mb-6">
                    <button onClick={clearText} className="btn btn-secondary">
                        Clear
                    </button>
                    <button onClick={loadSample} className="btn btn-ghost">
                        Load Sample
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="tool-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <div className="card text-center">
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
                            {stats.words.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Words</div>
                    </div>
                    <div className="card text-center">
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
                            {stats.characters.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Characters</div>
                    </div>
                    <div className="card text-center">
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
                            {stats.charactersNoSpaces.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>No Spaces</div>
                    </div>
                    <div className="card text-center">
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
                            {stats.sentences}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Sentences</div>
                    </div>
                    <div className="card text-center">
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
                            {stats.paragraphs}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Paragraphs</div>
                    </div>
                    <div className="card text-center">
                        <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
                            {stats.readingTime}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Reading Time</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
