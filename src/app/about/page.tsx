import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About - ToolForge",
    description: "Learn about ToolForge - a collection of free online tools for developers.",
};

export default function AboutPage() {
    return (
        <div className="container" style={{ maxWidth: "800px" }}>
            <section className="section">
                <h1 style={{ marginBottom: "var(--space-6)" }}>About ToolForge</h1>

                <p>
                    ToolForge is a collection of free, fast, and easy-to-use online tools designed
                    for developers, designers, and anyone who needs quick utilities without the
                    hassle of downloading software or creating accounts.
                </p>

                <h2 style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-4)" }}>Our Mission</h2>
                <p>
                    We believe that essential tools should be accessible to everyone. That&apos;s why
                    all our tools are completely free to use, with no sign-up required and no
                    artificial limitations.
                </p>

                <h2 style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-4)" }}>Privacy First</h2>
                <p>
                    Your privacy matters. All our tools process data directly in your browser.
                    We don&apos;t store, transmit, or have access to any data you enter into our tools.
                    Your information stays on your device.
                </p>

                <h2 style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-4)" }}>Open & Transparent</h2>
                <p>
                    We&apos;re committed to being transparent about how our tools work and how we
                    sustain the project. ToolForge is supported by non-intrusive advertising,
                    which allows us to keep all tools free for everyone.
                </p>

                <h2 style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-4)" }}>Contact</h2>
                <p>
                    Have feedback, suggestions, or found a bug? We&apos;d love to hear from you.
                    Reach out to us and help us make ToolForge even better.
                </p>
            </section>
        </div>
    );
}
