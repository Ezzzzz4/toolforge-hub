import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - ToolForge",
    description: "Terms of service for using ToolForge tools and website.",
};

export default function TermsPage() {
    return (
        <div className="container" style={{ maxWidth: "800px" }}>
            <section className="section">
                <h1 style={{ marginBottom: "var(--space-6)" }}>Terms of Service</h1>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>
                    Last updated: January 2026
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Acceptance of Terms</h2>
                <p>
                    By accessing and using ToolForge, you accept and agree to be bound by these
                    Terms of Service. If you do not agree to these terms, please do not use our
                    website or tools.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Use of Services</h2>
                <p>ToolForge provides free online tools for personal and commercial use. You agree to:</p>
                <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-2)" }}>
                    <li>Use the tools only for lawful purposes</li>
                    <li>Not attempt to harm, disable, or overload our systems</li>
                    <li>Not use automated systems to access our services excessively</li>
                    <li>Not reverse engineer or copy our tools for redistribution</li>
                </ul>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Disclaimer of Warranties</h2>
                <p>
                    All tools are provided &quot;as is&quot; without warranty of any kind. We do not
                    guarantee that our tools will be error-free, accurate, or available at all
                    times. Use the output of our tools at your own risk.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Limitation of Liability</h2>
                <p>
                    ToolForge and its creators shall not be liable for any direct, indirect,
                    incidental, special, or consequential damages resulting from your use of
                    our tools or inability to use our tools.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Intellectual Property</h2>
                <p>
                    The ToolForge name, logo, and website content are protected by copyright
                    and other intellectual property laws. You may not use our branding without
                    prior written permission.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Third-Party Content</h2>
                <p>
                    Our website may display advertisements from third parties. We are not
                    responsible for the content or accuracy of third-party advertisements.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. Continued use of
                    our website after changes constitutes acceptance of the new terms.
                </p>

                <h2 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-4)" }}>Contact</h2>
                <p>
                    If you have any questions about these terms, please contact us.
                </p>
            </section>
        </div>
    );
}
