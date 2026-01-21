import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - ToolForge",
    description: "Privacy policy for ToolForge - how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
    return (
        <div className="container" style={{ maxWidth: "800px" }}>
            <section className="section">
                <h1 style={{ marginBottom: "var(--space-6)" }}>Privacy Policy</h1>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>
                    Last updated: January 2026
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Overview</h2>
                <p>
                    At ToolForge, we take your privacy seriously. This privacy policy explains how
                    we collect, use, and protect your information when you use our website and tools.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Data We Don&apos;t Collect</h2>
                <p>
                    <strong>Tool Data:</strong> All data you enter into our tools (JSON, passwords,
                    text, etc.) is processed entirely in your browser. We do not collect, store,
                    transmit, or have access to any data you input into our tools.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Data We Collect</h2>
                <p>We collect minimal, anonymized data to improve our services:</p>
                <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-2)" }}>
                    <li>Page views and general usage analytics (via Google Analytics)</li>
                    <li>Error reports to help us fix issues</li>
                    <li>Device type and browser information for compatibility</li>
                </ul>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Third-Party Services</h2>
                <p>We use the following third-party services:</p>
                <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-2)" }}>
                    <li><strong>Google Analytics:</strong> For website analytics and understanding user behavior</li>
                    <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                </ul>
                <p style={{ marginTop: "var(--space-4)" }}>
                    These services may use cookies. Please refer to their respective privacy
                    policies for more information.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Cookies</h2>
                <p>
                    We use cookies for analytics and advertising purposes. You can control
                    cookie preferences through your browser settings.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Your Rights</h2>
                <p>You have the right to:</p>
                <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-2)" }}>
                    <li>Access any personal data we hold about you</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of analytics tracking</li>
                </ul>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Contact</h2>
                <p>
                    If you have any questions about this privacy policy, please contact us.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Changes</h2>
                <p>
                    We may update this privacy policy from time to time. We will notify you of
                    any changes by posting the new policy on this page.
                </p>
            </section>
        </div>
    );
}
