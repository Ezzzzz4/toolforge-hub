export default function AdBanner({ type = "horizontal" }: { type?: "horizontal" | "rectangle" }) {
    const className = type === "horizontal" ? "ad-banner ad-banner-horizontal" : "ad-banner ad-banner-rectangle";

    return (
        <div className={className}>
            <p>Advertisement</p>
            {/* Replace with actual AdSense code after approval */}
        </div>
    );
}
