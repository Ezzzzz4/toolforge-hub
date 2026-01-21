import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JWT Decoder - Decode JSON Web Tokens Online | ToolForge",
    description: "Free online JWT decoder. Decode and inspect JSON Web Tokens, view header, payload, and expiration times.",
    keywords: ["jwt decoder", "json web token", "decode jwt", "jwt parser", "jwt online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
