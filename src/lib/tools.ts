export interface Tool {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    icon: string;
    category: "formatter" | "generator" | "encoder" | "utility";
}

export const tools: Tool[] = [
    {
        slug: "json-formatter",
        title: "JSON Formatter & Validator",
        shortTitle: "JSON Formatter",
        description: "Format, beautify, and validate JSON data instantly",
        icon: "{ }",
        category: "formatter",
    },
    {
        slug: "qr-code-generator",
        title: "QR Code Generator",
        shortTitle: "QR Code",
        description: "Generate QR codes from text or URLs for free",
        icon: "📱",
        category: "generator",
    },
    {
        slug: "password-generator",
        title: "Secure Password Generator",
        shortTitle: "Password",
        description: "Create strong, random passwords with custom options",
        icon: "🔐",
        category: "generator",
    },
    {
        slug: "word-counter",
        title: "Word & Character Counter",
        shortTitle: "Word Counter",
        description: "Count words, characters, sentences, and paragraphs",
        icon: "📝",
        category: "utility",
    },
    {
        slug: "lorem-ipsum-generator",
        title: "Lorem Ipsum Generator",
        shortTitle: "Lorem Ipsum",
        description: "Generate placeholder text for your designs",
        icon: "📄",
        category: "generator",
    },
    {
        slug: "color-palette-generator",
        title: "Color Palette Generator",
        shortTitle: "Color Palette",
        description: "Create beautiful color palettes for your projects",
        icon: "🎨",
        category: "generator",
    },
    {
        slug: "base64-encoder",
        title: "Base64 Encoder & Decoder",
        shortTitle: "Base64",
        description: "Encode or decode Base64 strings quickly",
        icon: "🔄",
        category: "encoder",
    },
    {
        slug: "uuid-generator",
        title: "UUID Generator",
        shortTitle: "UUID",
        description: "Generate random UUIDs (v4) instantly",
        icon: "🆔",
        category: "generator",
    },
    {
        slug: "regex-tester",
        title: "Regex Tester & Debugger",
        shortTitle: "Regex Tester",
        description: "Test and debug regular expressions in real-time",
        icon: "🔍",
        category: "utility",
    },
    {
        slug: "hash-generator",
        title: "Hash Generator",
        shortTitle: "Hash",
        description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes",
        icon: "#️⃣",
        category: "encoder",
    },
    {
        slug: "text-case-converter",
        title: "Text Case Converter",
        shortTitle: "Case Converter",
        description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more",
        icon: "Aa",
        category: "utility",
    },
    {
        slug: "timestamp-converter",
        title: "Unix Timestamp Converter",
        shortTitle: "Timestamp",
        description: "Convert between Unix timestamps and human-readable dates",
        icon: "⏱️",
        category: "utility",
    },
    {
        slug: "url-encoder",
        title: "URL Encoder & Decoder",
        shortTitle: "URL Encoder",
        description: "Encode or decode URLs and query strings",
        icon: "🔗",
        category: "encoder",
    },
    {
        slug: "slug-generator",
        title: "Slug Generator",
        shortTitle: "Slug",
        description: "Create URL-friendly slugs from any text",
        icon: "🔤",
        category: "generator",
    },
    {
        slug: "sql-formatter",
        title: "SQL Formatter & Beautifier",
        shortTitle: "SQL Formatter",
        description: "Format and beautify SQL queries with dialect support",
        icon: "📊",
        category: "formatter",
    },
    {
        slug: "yaml-json-converter",
        title: "YAML ↔ JSON Converter",
        shortTitle: "YAML/JSON",
        description: "Convert between YAML and JSON formats instantly",
        icon: "🔀",
        category: "encoder",
    },
    {
        slug: "jwt-decoder",
        title: "JWT Decoder",
        shortTitle: "JWT Decoder",
        description: "Decode and inspect JSON Web Tokens",
        icon: "🎫",
        category: "utility",
    },
    {
        slug: "diff-checker",
        title: "Text Diff Checker",
        shortTitle: "Diff Checker",
        description: "Compare two texts and highlight differences",
        icon: "📋",
        category: "utility",
    },
];

export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(currentSlug: string, limit: number = 5): Tool[] {
    const current = getToolBySlug(currentSlug);
    if (!current) return tools.slice(0, limit);

    // Get tools from same category first, then others
    const sameCategory = tools.filter(
        (t) => t.category === current.category && t.slug !== currentSlug
    );
    const otherTools = tools.filter(
        (t) => t.category !== current.category && t.slug !== currentSlug
    );

    return [...sameCategory, ...otherTools].slice(0, limit);
}
