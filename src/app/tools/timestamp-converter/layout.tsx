import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unix Timestamp Converter - Convert Epoch Time to Date | ToolForge",
    description: "Free online Unix timestamp converter. Convert between Unix epoch timestamps and human-readable dates instantly.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "unix time", "epoch time"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
