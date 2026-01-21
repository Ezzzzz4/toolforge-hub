import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Color Palette Generator - Free Color Scheme Generator | ToolForge",
    description: "Generate beautiful color palettes for your design projects. Lock colors you like and regenerate the rest.",
    keywords: ["color palette generator", "color scheme", "color picker", "palette generator", "design colors"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
