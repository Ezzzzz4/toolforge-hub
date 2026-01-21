"use client";

import { useState } from "react";
import yaml from "js-yaml";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";
import DownloadButton from "@/components/DownloadButton";

export default function YamlJsonConverterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
    const [error, setError] = useState("");

    const convert = () => {
        setError("");
        try {
            if (mode === "yaml-to-json") {
                const parsed = yaml.load(input);
                setOutput(JSON.stringify(parsed, null, 2));
            } else {
                const parsed = JSON.parse(input);
                setOutput(yaml.dump(parsed, { indent: 2, lineWidth: -1 }));
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Conversion failed");
            setOutput("");
        }
    };

    const swap = () => {
        setInput(output);
        setOutput("");
        setMode(mode === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
        setError("");
    };

    const loadSample = () => {
        if (mode === "yaml-to-json") {
            setInput(`# Server configuration
server:
  host: localhost
  port: 8080
  
database:
  type: postgresql
  host: db.example.com
  credentials:
    username: admin
    password: secret123
    
features:
  - authentication
  - logging
  - caching`);
        } else {
            setInput(`{
  "server": {
    "host": "localhost",
    "port": 8080
  },
  "database": {
    "type": "postgresql",
    "host": "db.example.com"
  },
  "features": ["authentication", "logging", "caching"]
}`);
        }
    };

    return (
        <ToolLayout
            slug="yaml-json-converter"
            title="YAML ↔ JSON Converter"
            description="Convert between YAML and JSON formats instantly. Perfect for configuration files and API development."
            howToUse={[
                "Choose conversion direction (YAML to JSON or JSON to YAML)",
                "Paste your content in the input area",
                "Click Convert to transform",
            ]}
            faq={[
                {
                    question: "What's the difference between YAML and JSON?",
                    answer: "YAML is human-readable and supports comments, making it popular for config files. JSON is more compact and widely supported in APIs.",
                },
                {
                    question: "Are comments preserved?",
                    answer: "YAML comments are not preserved when converting to JSON, as JSON doesn't support comments.",
                },
            ]}
        >
            <div className="card">
                {/* Mode Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${mode === "yaml-to-json" ? "active" : ""}`}
                        onClick={() => setMode("yaml-to-json")}
                    >
                        YAML → JSON
                    </button>
                    <button
                        className={`tab ${mode === "json-to-yaml" ? "active" : ""}`}
                        onClick={() => setMode("json-to-yaml")}
                    >
                        JSON → YAML
                    </button>
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="input" className="label">
                        {mode === "yaml-to-json" ? "YAML Input" : "JSON Input"}
                    </label>
                    <textarea
                        id="input"
                        className={`textarea textarea-mono ${error ? "input-error" : ""}`}
                        placeholder={mode === "yaml-to-json" ? "key: value" : '{"key": "value"}'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={8}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Actions */}
                <div className="action-row mb-4">
                    <button onClick={convert} className="btn btn-primary">
                        Convert
                    </button>
                    <button onClick={swap} className="btn btn-secondary" disabled={!output}>
                        ⇅ Swap
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
                    <label className="label">
                        {mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
                    </label>
                    <div style={{ position: "relative" }}>
                        <pre className="code-output" style={{ minHeight: "150px" }}>{output}</pre>
                        {output && <CopyButton text={output} className="copy-btn" />}
                    </div>
                    {output && (
                        <div style={{ marginTop: "0.5rem" }}>
                            <DownloadButton
                                content={output}
                                filename={mode === "yaml-to-json" ? "output.json" : "output.yaml"}
                                mimeType={mode === "yaml-to-json" ? "application/json" : "text/yaml"}
                            />
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
