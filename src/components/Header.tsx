import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
    return (
        <header className="header">
            <div className="container header-inner">
                <Link href="/" className="header-logo">
                    <span className="header-logo-icon">🔧</span>
                    <span>ToolForge</span>
                </Link>

                <nav className="header-nav">
                    <Link href="/tools" className="header-nav-link">
                        All Tools
                    </Link>
                    <Link href="/about" className="header-nav-link">
                        About
                    </Link>
                    <DarkModeToggle />
                </nav>
            </div>
        </header>
    );
}
