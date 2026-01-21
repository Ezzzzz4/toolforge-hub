"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function PasswordGeneratorPage() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });

    const generatePassword = useCallback(() => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let chars = "";
        if (options.uppercase) chars += uppercaseChars;
        if (options.lowercase) chars += lowercaseChars;
        if (options.numbers) chars += numberChars;
        if (options.symbols) chars += symbolChars;

        if (chars === "") {
            setPassword("Please select at least one character type");
            return;
        }

        let result = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }

        setPassword(result);
    }, [length, options]);

    const getStrength = () => {
        if (!password || password.includes("Please select")) return { label: "None", width: "0%", class: "" };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (options.uppercase) score++;
        if (options.lowercase) score++;
        if (options.numbers) score++;
        if (options.symbols) score++;

        if (score <= 3) return { label: "Weak", width: "25%", class: "strength-weak" };
        if (score <= 5) return { label: "Fair", width: "50%", class: "strength-fair" };
        if (score <= 6) return { label: "Good", width: "75%", class: "strength-good" };
        return { label: "Strong", width: "100%", class: "strength-strong" };
    };

    const strength = getStrength();

    return (
        <ToolLayout
            slug="password-generator"
            title="Secure Password Generator"
            description="Generate strong, random passwords with customizable length and character types. Cryptographically secure."
            howToUse={[
                "Choose your desired password length using the slider",
                "Select which character types to include",
                "Click 'Generate Password' to create a new password",
                "Copy the password with one click",
            ]}
            faq={[
                {
                    question: "Are these passwords secure?",
                    answer: "Yes! We use the browser's cryptographically secure random number generator (crypto.getRandomValues) for true randomness.",
                },
                {
                    question: "Is my password stored anywhere?",
                    answer: "No. Passwords are generated entirely in your browser and are never sent to any server.",
                },
                {
                    question: "What makes a password strong?",
                    answer: "A strong password is at least 12 characters long and includes uppercase, lowercase, numbers, and symbols.",
                },
            ]}
        >
            <div className="card">
                {/* Password Display */}
                <div className="mb-4">
                    <label className="label">Generated Password</label>
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            className="input input-mono"
                            value={password}
                            readOnly
                            placeholder="Click generate to create a password"
                            style={{ paddingRight: "3rem", fontSize: "1.25rem" }}
                        />
                        {password && !password.includes("Please select") && (
                            <CopyButton text={password} className="copy-btn" />
                        )}
                    </div>

                    {/* Strength Meter */}
                    {password && !password.includes("Please select") && (
                        <div className="mt-4">
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Strength:</span>
                                <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>{strength.label}</span>
                            </div>
                            <div className="strength-meter">
                                <div
                                    className={`strength-meter-fill ${strength.class}`}
                                    style={{ width: strength.width }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Length Slider */}
                <div className="mb-4">
                    <label className="label">
                        Password Length: <strong>{length}</strong> characters
                    </label>
                    <input
                        type="range"
                        className="slider"
                        min="8"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                        <span>8</span>
                        <span>64</span>
                    </div>
                </div>

                {/* Character Options */}
                <div className="mb-6">
                    <label className="label">Include Characters</label>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={options.uppercase}
                                onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                            />
                            Uppercase (A-Z)
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={options.lowercase}
                                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                            />
                            Lowercase (a-z)
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={options.numbers}
                                onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                            />
                            Numbers (0-9)
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={options.symbols}
                                onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                            />
                            Symbols (!@#$%)
                        </label>
                    </div>
                </div>

                {/* Generate Button */}
                <button onClick={generatePassword} className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                    Generate Password
                </button>
            </div>
        </ToolLayout>
    );
}
