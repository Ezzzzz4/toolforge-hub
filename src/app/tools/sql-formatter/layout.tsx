import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SQL Formatter - Free Online SQL Beautifier | ToolForge",
    description: "Format and beautify SQL queries online. Supports MySQL, PostgreSQL, SQLite. Free SQL formatter with proper indentation.",
    keywords: ["sql formatter", "sql beautifier", "format sql", "sql pretty print", "mysql formatter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
