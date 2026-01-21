import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Free Online Developer Tools</h1>
        <p className="hero-subtitle">
          A collection of fast, free, and easy-to-use tools for developers.
          No sign-up required. All processing happens in your browser.
        </p>
      </section>

      {/* Ad Banner */}
      <AdBanner type="horizontal" />

      {/* Tools Grid */}
      <section className="section">
        <h2 className="sr-only">All Tools</h2>
        <div className="tool-grid">
          {tools.map((tool) => (
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

      {/* Ad Banner */}
      <AdBanner type="horizontal" />

      {/* Features Section */}
      <section className="section">
        <h2 className="section-title text-center">Why ToolForge?</h2>
        <div className="tool-grid">
          <div className="card">
            <div className="tool-card-icon">⚡</div>
            <h3 className="tool-card-title">Lightning Fast</h3>
            <p className="tool-card-description">
              All tools run directly in your browser. No server processing means instant results.
            </p>
          </div>
          <div className="card">
            <div className="tool-card-icon">🔒</div>
            <h3 className="tool-card-title">Privacy First</h3>
            <p className="tool-card-description">
              Your data never leaves your browser. We don&apos;t store or transmit any of your inputs.
            </p>
          </div>
          <div className="card">
            <div className="tool-card-icon">🆓</div>
            <h3 className="tool-card-title">100% Free</h3>
            <p className="tool-card-description">
              All tools are completely free to use. No sign-up, no credit card, no limits.
            </p>
          </div>
          <div className="card">
            <div className="tool-card-icon">📱</div>
            <h3 className="tool-card-title">Mobile Friendly</h3>
            <p className="tool-card-description">
              Works perfectly on any device - desktop, tablet, or mobile phone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
