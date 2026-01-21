import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Regex Tester - Free Online Regular Expression Tester | ToolForge",
    description: "Test and debug regular expressions in real-time. See matches highlighted, capture groups extracted, and common patterns.",
    keywords: ["regex tester", "regular expression", "regex debugger", "regex online", "pattern matching"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
