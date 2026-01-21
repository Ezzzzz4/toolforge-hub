import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text Diff Checker - Compare Two Texts Online | ToolForge",
    description: "Free online diff checker. Compare two texts and highlight differences. Perfect for comparing code, documents, or any text.",
    keywords: ["diff checker", "text compare", "compare text", "diff tool", "text diff online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
