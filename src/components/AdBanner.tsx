"use client";

import { useEffect } from "react";

interface AdBannerProps {
    type?: "horizontal" | "rectangle" | "square";
    slot?: string; // AdSense ad slot ID
}

export default function AdBanner({ type = "horizontal", slot }: AdBannerProps) {
    const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

    useEffect(() => {
        if (adClient && slot) {
            try {
                // Push ad to AdSense queue
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (err) {
                console.error("AdSense error:", err);
            }
        }
    }, [adClient, slot]);

    // If no AdSense configured yet, show placeholder
    if (!adClient || !slot) {
        const className =
            type === "horizontal"
                ? "ad-banner ad-banner-horizontal"
                : type === "rectangle"
                    ? "ad-banner ad-banner-rectangle"
                    : "ad-banner ad-banner-square";

        return (
            <div className={className}>
                <p>Advertisement Space</p>
                <small style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID to enable ads
                </small>
            </div>
        );
    }

    // Get ad dimensions based on type
    const dimensions = {
        horizontal: { width: 728, height: 90 },  // Leaderboard
        rectangle: { width: 300, height: 250 },  // Medium Rectangle
        square: { width: 250, height: 250 },     // Square
    };

    const { width, height } = dimensions[type];

    return (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={adClient}
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
