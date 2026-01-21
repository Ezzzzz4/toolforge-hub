import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text Case Converter - Convert Text to UPPERCASE, lowercase, Title Case | ToolForge",
    description: "Free online text case converter. Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, and more.",
    keywords: ["text case converter", "uppercase converter", "lowercase converter", "title case", "camelcase converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
