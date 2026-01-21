import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/Toast";

export const metadata: Metadata = {
  title: "ToolForge - Free Online Developer Tools",
  description: "A collection of free online tools for developers. JSON formatter, QR code generator, password generator, and more. No sign-up required.",
  keywords: ["developer tools", "online tools", "JSON formatter", "QR code generator", "free tools"],
  authors: [{ name: "ToolForge" }],
  openGraph: {
    title: "ToolForge - Free Online Developer Tools",
    description: "A collection of free online tools for developers. No sign-up required.",
    type: "website",
  },
};

const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {adClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
