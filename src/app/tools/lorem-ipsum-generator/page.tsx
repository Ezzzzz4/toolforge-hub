"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
    "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
    "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
    "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
    "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
    "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi",
    "nesciunt", "neque", "porro", "quisquam",
];

function generateWord(): string {
    return words[Math.floor(Math.random() * words.length)];
}

function generateSentence(minWords: number = 8, maxWords: number = 15): string {
    const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const sentence: string[] = [];
    for (let i = 0; i < length; i++) {
        sentence.push(generateWord());
    }
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    return sentence.join(" ") + ".";
}

function generateParagraph(minSentences: number = 4, maxSentences: number = 8): string {
    const length = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    const sentences: string[] = [];
    for (let i = 0; i < length; i++) {
        sentences.push(generateSentence());
    }
    return sentences.join(" ");
}

export default function LoremIpsumGeneratorPage() {
    const [output, setOutput] = useState("");
    const [count, setCount] = useState(3);
    const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");

    const generate = () => {
        let result = "";

        if (type === "paragraphs") {
            const paragraphs: string[] = [];
            for (let i = 0; i < count; i++) {
                paragraphs.push(generateParagraph());
            }
            result = paragraphs.join("\n\n");
        } else if (type === "sentences") {
            const sentences: string[] = [];
            for (let i = 0; i < count; i++) {
                sentences.push(generateSentence());
            }
            result = sentences.join(" ");
        } else {
            const wordList: string[] = [];
            for (let i = 0; i < count; i++) {
                wordList.push(generateWord());
            }
            wordList[0] = wordList[0].charAt(0).toUpperCase() + wordList[0].slice(1);
            result = wordList.join(" ") + ".";
        }

        setOutput(result);
    };

    const clearAll = () => {
        setOutput("");
    };

    return (
        <ToolLayout
            slug="lorem-ipsum-generator"
            title="Lorem Ipsum Generator"
            description="Generate placeholder text for your designs, mockups, and layouts. Choose paragraphs, sentences, or words."
            howToUse={[
                "Select the type of output (paragraphs, sentences, or words)",
                "Enter the number you want to generate",
                "Click 'Generate' to create the placeholder text",
                "Copy the text with one click",
            ]}
            faq={[
                {
                    question: "What is Lorem Ipsum?",
                    answer: "Lorem Ipsum is placeholder text used in the design and publishing industry. It has been used since the 1500s.",
                },
                {
                    question: "Why use Lorem Ipsum?",
                    answer: "It provides realistic-looking text to fill layouts without the distraction of meaningful content during the design process.",
                },
            ]}
        >
            <div className="card">
                {/* Controls */}
                <div className="mb-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div>
                        <label className="label">Type</label>
                        <div className="action-row">
                            {(["paragraphs", "sentences", "words"] as const).map((t) => (
                                <button
                                    key={t}
                                    className={`btn ${type === t ? "btn-primary" : "btn-secondary"}`}
                                    onClick={() => setType(t)}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="count" className="label">Count</label>
                        <input
                            id="count"
                            type="number"
                            className="input"
                            min="1"
                            max={type === "words" ? 500 : 50}
                            value={count}
                            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
                            style={{ width: "100px" }}
                        />
                    </div>

                    <button onClick={generate} className="btn btn-primary btn-lg">
                        Generate
                    </button>

                    {output && (
                        <button onClick={clearAll} className="btn btn-ghost">
                            Clear
                        </button>
                    )}
                </div>

                {/* Output */}
                <div>
                    <label className="label">Generated Text</label>
                    <div style={{ position: "relative" }}>
                        <div
                            className="code-output"
                            style={{
                                whiteSpace: "pre-wrap",
                                fontFamily: "var(--font-sans)",
                                fontSize: "1rem",
                                lineHeight: "1.7",
                            }}
                        >
                            {output || "Click 'Generate' to create placeholder text..."}
                        </div>
                        {output && <CopyButton text={output} className="copy-btn" />}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
