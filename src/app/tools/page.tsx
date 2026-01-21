import { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
    title: "All Tools - Free Online Developer Tools | ToolForge",
    description: "Browse all free online developer tools. Find the perfect tool for your needs.",
};

export default function ToolsPage() {
    const categories = {
        formatter: tools.filter((t) => t.category === "formatter"),
        generator: tools.filter((t) => t.category === "generator"),
        encoder: tools.filter((t) => t.category === "encoder"),
        utility: tools.filter((t) => t.category === "utility"),
    };

    return (
        <div className="container">
            <section className="hero" style={{ paddingBottom: "var(--space-6)" }}>
                <h1 className="hero-title">All Tools</h1>
                <p className="hero-subtitle">
                    Browse our complete collection of free developer tools
                </p>
            </section>

            <AdBanner type="horizontal" />

            {/* Formatters */}
            {categories.formatter.length > 0 && (
                <section className="section">
                    <h2 className="section-title">Formatters</h2>
                    <div className="tool-grid">
                        {categories.formatter.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                icon={tool.icon}
                                title={tool.shortTitle}
                                description={tool.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Generators */}
            {categories.generator.length > 0 && (
                <section className="section">
                    <h2 className="section-title">Generators</h2>
                    <div className="tool-grid">
                        {categories.generator.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                icon={tool.icon}
                                title={tool.shortTitle}
                                description={tool.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Encoders */}
            {categories.encoder.length > 0 && (
                <section className="section">
                    <h2 className="section-title">Encoders & Hash</h2>
                    <div className="tool-grid">
                        {categories.encoder.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                icon={tool.icon}
                                title={tool.shortTitle}
                                description={tool.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Utilities */}
            {categories.utility.length > 0 && (
                <section className="section">
                    <h2 className="section-title">Utilities</h2>
                    <div className="tool-grid">
                        {categories.utility.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                icon={tool.icon}
                                title={tool.shortTitle}
                                description={tool.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            <AdBanner type="horizontal" />
        </div>
    );
}
