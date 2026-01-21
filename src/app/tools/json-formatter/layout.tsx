import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Formatter & Validator - Free Online JSON Beautifier | ToolForge",
    description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. No sign-up required.",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier", "format json online"],
};

export default function JsonFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
