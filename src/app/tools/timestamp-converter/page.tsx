"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function TimestampConverterPage() {
    const [unixInput, setUnixInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [results, setResults] = useState<{
        unix: number;
        iso: string;
        utc: string;
        local: string;
        relative: string;
    } | null>(null);

    const now = Math.floor(Date.now() / 1000);

    const convertFromUnix = () => {
        const timestamp = parseInt(unixInput);
        if (isNaN(timestamp)) return;

        // Handle both seconds and milliseconds
        const ms = timestamp > 9999999999 ? timestamp : timestamp * 1000;
        const date = new Date(ms);

        setResults({
            unix: Math.floor(ms / 1000),
            iso: date.toISOString(),
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            relative: getRelativeTime(date),
        });
    };

    const convertFromDate = () => {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return;

        setResults({
            unix: Math.floor(date.getTime() / 1000),
            iso: date.toISOString(),
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            relative: getRelativeTime(date),
        });
    };

    const useNow = () => {
        const date = new Date();
        setUnixInput(String(Math.floor(date.getTime() / 1000)));
        setResults({
            unix: Math.floor(date.getTime() / 1000),
            iso: date.toISOString(),
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            relative: "just now",
        });
    };

    function getRelativeTime(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.abs(Math.floor(diff / 1000));
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const years = Math.floor(days / 365);

        const suffix = diff > 0 ? "ago" : "from now";

        if (years > 0) return `${years} year${years > 1 ? "s" : ""} ${suffix}`;
        if (days > 0) return `${days} day${days > 1 ? "s" : ""} ${suffix}`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ${suffix}`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ${suffix}`;
        return "just now";
    }

    return (
        <ToolLayout
            slug="timestamp-converter"
            title="Unix Timestamp Converter"
            description="Convert between Unix timestamps and human-readable dates. Support for seconds and milliseconds."
            howToUse={[
                "Enter a Unix timestamp or a date string",
                "Click Convert to see all formats",
                "Use 'Now' button to get current timestamp",
            ]}
            faq={[
                {
                    question: "What is a Unix timestamp?",
                    answer: "A Unix timestamp is the number of seconds since January 1, 1970 (UTC). It's a standard way to represent time in computing.",
                },
                {
                    question: "Seconds vs Milliseconds?",
                    answer: "Unix timestamps are typically in seconds (10 digits), but JavaScript uses milliseconds (13 digits). We detect and handle both.",
                },
            ]}
        >
            <div className="card">
                {/* Current Time */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Current Unix Time</div>
                    <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{now}</div>
                    <button onClick={useNow} className="btn btn-ghost" style={{ marginTop: "0.5rem" }}>
                        Use Current Time
                    </button>
                </div>

                {/* Converters */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {/* Unix to Date */}
                    <div>
                        <label htmlFor="unix" className="label">Unix Timestamp</label>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <input
                                id="unix"
                                type="text"
                                className="input input-mono"
                                placeholder="1706745600"
                                value={unixInput}
                                onChange={(e) => setUnixInput(e.target.value)}
                            />
                            <button onClick={convertFromUnix} className="btn btn-primary">
                                Convert
                            </button>
                        </div>
                    </div>

                    {/* Date to Unix */}
                    <div>
                        <label htmlFor="date" className="label">Date String</label>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <input
                                id="date"
                                type="text"
                                className="input"
                                placeholder="2026-01-20 or Jan 20, 2026"
                                value={dateInput}
                                onChange={(e) => setDateInput(e.target.value)}
                            />
                            <button onClick={convertFromDate} className="btn btn-primary">
                                Convert
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {results && (
                    <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {[
                            { label: "Unix Timestamp", value: String(results.unix) },
                            { label: "ISO 8601", value: results.iso },
                            { label: "UTC", value: results.utc },
                            { label: "Local Time", value: results.local },
                            { label: "Relative", value: results.relative },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem",
                                    backgroundColor: "var(--color-bg-tertiary)",
                                    borderRadius: "var(--radius-md)",
                                }}
                            >
                                <span style={{ width: "120px", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{label}</span>
                                <span style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>{value}</span>
                                <CopyButton text={value} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
