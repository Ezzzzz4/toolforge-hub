import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Generator - Free Secure Password Generator | ToolForge",
    description: "Generate strong, secure passwords with customizable length and character types. Free online password generator.",
    keywords: ["password generator", "secure password", "random password", "strong password generator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
