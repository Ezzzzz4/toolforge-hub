import Link from "next/link";
import { getRelatedTools } from "@/lib/tools";
import AdBanner from "@/components/AdBanner";

interface ToolLayoutProps {
    slug: string;
    title: string;
    description: string;
    children: React.ReactNode;
    howToUse: string[];
    faq?: { question: string; answer: string }[];
}

export default function ToolLayout({
    slug,
    title,
    description,
    children,
    howToUse,
    faq = [],
}: ToolLayoutProps) {
    const relatedTools = getRelatedTools(slug);

    return (
        <div className="container tool-page">
            <AdBanner type="horizontal" />

            <div className="tool-container">
                <div className="tool-main">
                    <header className="tool-header">
                        <h1 className="tool-title">{title}</h1>
                        <p className="tool-description">{description}</p>
                    </header>

                    {children}

                    {/* How to Use */}
                    <div className="how-to-use">
                        <h2 className="how-to-use-title">How to Use</h2>
                        <ol className="how-to-use-list">
                            {howToUse.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* FAQ */}
                    {faq.length > 0 && (
                        <section className="faq">
                            <h2 className="faq-title">Frequently Asked Questions</h2>
                            {faq.map((item, index) => (
                                <div key={index} className="faq-item">
                                    <h3 className="faq-question">{item.question}</h3>
                                    <p className="faq-answer">{item.answer}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                <aside className="tool-sidebar">
                    {/* Ad Unit */}
                    <AdBanner type="rectangle" />

                    {/* Related Tools */}
                    <div className="related-tools">
                        <h3 className="related-tools-title">Related Tools</h3>
                        <div className="related-tools-list">
                            {relatedTools.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    className="related-tools-item"
                                >
                                    <span>{tool.icon}</span>
                                    <span>{tool.shortTitle}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <AdBanner type="horizontal" />
        </div>
    );
}
