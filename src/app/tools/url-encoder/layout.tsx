import { Metadata } from "next";

export const metadata: Metadata = {
    title: "URL Encoder & Decoder - Encode/Decode URLs Online | ToolForge",
    description: "Free online URL encoder and decoder. Encode special characters for URLs or decode URL-encoded strings.",
    keywords: ["url encoder", "url decoder", "urlencode", "percent encoding", "url encode online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
