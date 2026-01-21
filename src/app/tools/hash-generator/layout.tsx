import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hash Generator - Free MD5, SHA256 Hash Generator | ToolForge",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. Free online hash generator.",
    keywords: ["hash generator", "md5 hash", "sha256 hash", "sha512", "online hash"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
