import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YAML to JSON Converter - Convert YAML ↔ JSON Online | ToolForge",
    description: "Free online YAML to JSON and JSON to YAML converter. Transform configuration files instantly.",
    keywords: ["yaml to json", "json to yaml", "yaml converter", "yaml json", "config converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
