import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Slug Generator - Create URL-Friendly Slugs Online | ToolForge",
    description: "Free online slug generator. Create SEO-friendly URL slugs from any text. Perfect for blog posts and product URLs.",
    keywords: ["slug generator", "url slug", "seo url", "url friendly", "permalink generator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
