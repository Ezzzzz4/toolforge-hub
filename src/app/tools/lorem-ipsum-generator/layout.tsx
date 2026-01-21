import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator - Free Placeholder Text Generator | ToolForge",
    description: "Generate Lorem Ipsum placeholder text for your designs. Create paragraphs, sentences, or words instantly.",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text", "lorem ipsum", "text generator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
