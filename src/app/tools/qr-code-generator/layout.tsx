import { Metadata } from "next";

export const metadata: Metadata = {
    title: "QR Code Generator - Free Online QR Code Maker | ToolForge",
    description: "Generate QR codes for free. Create QR codes from text, URLs, or any data. Download in PNG format.",
    keywords: ["qr code generator", "qr code maker", "create qr code", "free qr code", "qr code online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
