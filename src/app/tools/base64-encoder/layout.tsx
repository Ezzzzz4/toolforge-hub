import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Encoder & Decoder - Free Online Base64 Tool | ToolForge",
    description: "Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 strings instantly.",
    keywords: ["base64 encoder", "base64 decoder", "base64 encode", "base64 decode", "base64 converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
