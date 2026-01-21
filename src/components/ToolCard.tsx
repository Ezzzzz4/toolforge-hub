import Link from "next/link";

interface ToolCardProps {
    href: string;
    icon: string;
    title: string;
    description: string;
}

export default function ToolCard({ href, icon, title, description }: ToolCardProps) {
    return (
        <Link href={href} className="card card-interactive tool-card">
            <div className="tool-card-icon">{icon}</div>
            <h3 className="tool-card-title">{title}</h3>
            <p className="tool-card-description">{description}</p>
        </Link>
    );
}
