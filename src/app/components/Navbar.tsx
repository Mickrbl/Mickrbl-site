import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <Link href="/" className="font-semibold tracking-tight">
                    Mickol Roe Baronia Lasquety
                </Link>

                <nav className="flex items-center gap-4 text-sm">
                    <Link href="/projects" className="text-black/70 hover:text-black">
                        Projects
                    </Link>
                    <a href="#contact" className="text-black/70 hover:text-black">
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    );
}
