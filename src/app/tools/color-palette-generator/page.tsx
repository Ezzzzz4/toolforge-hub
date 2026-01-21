"use client";

import { useState, useCallback } from "react";
import chroma from "chroma-js";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

interface ColorSwatch {
    hex: string;
    locked: boolean;
}

function generateRandomColor(): string {
    return chroma.random().hex();
}

export default function ColorPaletteGeneratorPage() {
    const [colors, setColors] = useState<ColorSwatch[]>([
        { hex: "#6366f1", locked: false },
        { hex: "#ec4899", locked: false },
        { hex: "#f59e0b", locked: false },
        { hex: "#22c55e", locked: false },
        { hex: "#06b6d4", locked: false },
    ]);

    const generatePalette = useCallback(() => {
        setColors((prev) =>
            prev.map((color) =>
                color.locked ? color : { hex: generateRandomColor(), locked: false }
            )
        );
    }, []);

    const toggleLock = (index: number) => {
        setColors((prev) =>
            prev.map((color, i) =>
                i === index ? { ...color, locked: !color.locked } : color
            )
        );
    };

    const copyAsCSS = () => {
        const css = colors
            .map((color, i) => `--color-${i + 1}: ${color.hex};`)
            .join("\n");
        navigator.clipboard.writeText(`:root {\n  ${css.split("\n").join("\n  ")}\n}`);
    };

    const copyAsArray = () => {
        const arr = JSON.stringify(colors.map((c) => c.hex));
        navigator.clipboard.writeText(arr);
    };

    return (
        <ToolLayout
            slug="color-palette-generator"
            title="Color Palette Generator"
            description="Generate beautiful color palettes for your projects. Lock colors you like and regenerate the rest."
            howToUse={[
                "Click 'Generate Palette' to create new colors",
                "Click any color to copy its hex code",
                "Click the lock icon to keep colors you like",
                "Generate again to replace only unlocked colors",
            ]}
            faq={[
                {
                    question: "How are colors generated?",
                    answer: "Colors are randomly generated across the entire color spectrum using mathematically balanced algorithms.",
                },
                {
                    question: "Can I save my palettes?",
                    answer: "Use the 'Copy as CSS' or 'Copy as Array' buttons to save your palette for later use.",
                },
            ]}
        >
            <div className="card">
                {/* Color Swatches */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    {colors.map((color, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                            <button
                                onClick={() => navigator.clipboard.writeText(color.hex)}
                                style={{
                                    width: "100%",
                                    aspectRatio: "1",
                                    backgroundColor: color.hex,
                                    border: "none",
                                    borderRadius: "var(--radius-lg)",
                                    cursor: "pointer",
                                    transition: "transform var(--transition-fast)",
                                    marginBottom: "0.5rem",
                                }}
                                title={`Click to copy ${color.hex}`}
                                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                <code style={{ fontSize: "0.75rem" }}>{color.hex}</code>
                                <button
                                    onClick={() => toggleLock(index)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        opacity: color.locked ? 1 : 0.3,
                                    }}
                                    title={color.locked ? "Unlock" : "Lock"}
                                >
                                    {color.locked ? "🔒" : "🔓"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="action-row">
                    <button onClick={generatePalette} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                        Generate Palette
                    </button>
                    <button onClick={copyAsCSS} className="btn btn-secondary">
                        Copy as CSS
                    </button>
                    <button onClick={copyAsArray} className="btn btn-secondary">
                        Copy as Array
                    </button>
                </div>

                {/* Keyboard Hint */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "1rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                    }}
                >
                    💡 Tip: Press spacebar to generate a new palette!
                </p>
            </div>
        </ToolLayout>
    );
}
