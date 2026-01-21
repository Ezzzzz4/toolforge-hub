import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Word Counter - Free Online Word & Character Counter | ToolForge",
    description: "Free online word counter. Count words, characters, sentences, paragraphs, and estimate reading time instantly.",
    keywords: ["word counter", "character counter", "word count", "letter counter", "text counter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
