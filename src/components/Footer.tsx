import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <nav className="footer-links">
                    <Link href="/about" className="footer-link">
                        About
                    </Link>
                    <Link href="/privacy" className="footer-link">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="footer-link">
                        Terms of Service
                    </Link>
                </nav>

                <p className="footer-copyright">
                    © {currentYear} ToolForge. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
