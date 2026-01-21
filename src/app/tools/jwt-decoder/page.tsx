"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

interface JwtPayload {
    [key: string]: unknown;
    exp?: number;
    iat?: number;
    nbf?: number;
}

export default function JwtDecoderPage() {
    const [input, setInput] = useState("");
    const [header, setHeader] = useState<object | null>(null);
    const [payload, setPayload] = useState<JwtPayload | null>(null);
    const [error, setError] = useState("");

    const decode = () => {
        setError("");
        setHeader(null);
        setPayload(null);

        try {
            const parts = input.trim().split(".");
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format. Token must have 3 parts separated by dots.");
            }

            const [headerB64, payloadB64] = parts;

            // Decode header
            const headerJson = atob(headerB64.replace(/-/g, "+").replace(/_/g, "/"));
            const decodedHeader = JSON.parse(headerJson);
            setHeader(decodedHeader);

            // Decode payload
            const payloadJson = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
            const decodedPayload = JSON.parse(payloadJson);
            setPayload(decodedPayload);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to decode JWT");
        }
    };

    const formatTimestamp = (timestamp?: number): string => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp * 1000);
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const expired = diff < 0;
        const relative = Math.abs(Math.floor(diff / 1000 / 60));

        return `${date.toLocaleString()} (${expired ? "expired " : "expires in "}${relative} min${relative !== 1 ? "s" : ""})`;
    };

    const loadSample = () => {
        // Sample JWT (non-sensitive, for demo purposes)
        setInput("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4OTM0NTYwMDAsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
    };

    return (
        <ToolLayout
            slug="jwt-decoder"
            title="JWT Decoder"
            description="Decode and inspect JSON Web Tokens (JWT). View header, payload, and expiration information."
            howToUse={[
                "Paste your JWT token in the input field",
                "Click Decode to parse the token",
                "View header, payload, and timestamp info",
            ]}
            faq={[
                {
                    question: "What is a JWT?",
                    answer: "JWT (JSON Web Token) is a compact, URL-safe means of representing claims between two parties. It's commonly used for authentication.",
                },
                {
                    question: "Is this secure?",
                    answer: "Yes, decoding happens entirely in your browser. JWTs are not encrypted, just encoded - the signature is for verification, not secrecy.",
                },
                {
                    question: "Can I verify signatures here?",
                    answer: "This tool decodes tokens only. Signature verification requires the secret key, which should never be shared.",
                },
            ]}
        >
            <div className="card">
                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="jwt-input" className="label">
                        JWT Token
                    </label>
                    <textarea
                        id="jwt-input"
                        className={`textarea textarea-mono ${error ? "input-error" : ""}`}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Actions */}
                <div className="action-row mb-4">
                    <button onClick={decode} className="btn btn-primary">
                        Decode
                    </button>
                    <button onClick={loadSample} className="btn btn-ghost">
                        Load Sample
                    </button>
                    <button onClick={() => { setInput(""); setHeader(null); setPayload(null); setError(""); }} className="btn btn-ghost">
                        Clear
                    </button>
                </div>

                {/* Results */}
                {header && payload && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {/* Header */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <label className="label" style={{ marginBottom: 0 }}>Header</label>
                                <CopyButton text={JSON.stringify(header, null, 2)} />
                            </div>
                            <pre
                                style={{
                                    backgroundColor: "var(--color-bg-tertiary)",
                                    padding: "1rem",
                                    borderRadius: "var(--radius-md)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.875rem",
                                    overflow: "auto",
                                }}
                            >
                                {JSON.stringify(header, null, 2)}
                            </pre>
                        </div>

                        {/* Payload */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <label className="label" style={{ marginBottom: 0 }}>Payload</label>
                                <CopyButton text={JSON.stringify(payload, null, 2)} />
                            </div>
                            <pre
                                style={{
                                    backgroundColor: "var(--color-bg-tertiary)",
                                    padding: "1rem",
                                    borderRadius: "var(--radius-md)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.875rem",
                                    overflow: "auto",
                                }}
                            >
                                {JSON.stringify(payload, null, 2)}
                            </pre>
                        </div>

                        {/* Timestamps */}
                        {(payload.exp || payload.iat || payload.nbf) && (
                            <div style={{ backgroundColor: "var(--color-bg-secondary)", padding: "1rem", borderRadius: "var(--radius-lg)" }}>
                                <label className="label">Timestamps</label>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                                    {payload.iat && (
                                        <div><strong>Issued At (iat):</strong> {formatTimestamp(payload.iat)}</div>
                                    )}
                                    {payload.exp && (
                                        <div><strong>Expires (exp):</strong> {formatTimestamp(payload.exp)}</div>
                                    )}
                                    {payload.nbf && (
                                        <div><strong>Not Before (nbf):</strong> {formatTimestamp(payload.nbf)}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
