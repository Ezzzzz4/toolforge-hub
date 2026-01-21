import { Metadata } from "next";

export const metadata: Metadata = {
    title: "UUID Generator - Free Online UUID v4 Generator | ToolForge",
    description: "Generate random UUIDs (v4) instantly. Create single or bulk UUIDs for databases, APIs, and applications.",
    keywords: ["uuid generator", "uuid v4", "random uuid", "guid generator", "unique id generator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
