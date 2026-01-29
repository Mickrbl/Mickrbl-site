"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/app/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useT } from "@/app/hooks/useT";

/*Tooltip (sotto + animazione)*/
function Tooltip({ label, disabled = false }: { label: string; disabled?: boolean }) {
    if (disabled) return null;

    return (
        <span
            className={[
                "pointer-events-none absolute top-full -mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap",
                "rounded-xl bg-white/80 px-2 py-1 text-xs text-black/80 shadow-sm backdrop-blur dark:bg-zinc-900/80 dark:text-white/80",
                "opacity-0 -translate-y-1 scale-95",
                "transition-all duration-300 ease-out",
                "group-hover:opacity-100 group-hover:translate-y-5 group-hover:scale-100",
            ].join(" ")}
        >
      {label}
    </span>
    );
}

/*Icon Button*/
function IconButton({
                        children,
                        label,
                        onClick,
                        href,
                        as = "button",
                        tooltipDisabled = false,
                    }: {
    children: React.ReactNode;
    label: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    href?: string;
    as?: "button" | "a";
    tooltipDisabled?: boolean;
}) {
    const base =
        "group relative grid h-11 w-11 place-items-center rounded-2xl bg-transparent transition " +
        "hover:opacity-80 active:scale-[0.98]";

    if (as === "a" && href) {
        return (
            <a className={base} href={href} aria-label={label} onClick={onClick}>
                {children}
                <Tooltip label={label} disabled={tooltipDisabled} />
            </a>
        );
    }

    return (
        <button type="button" className={base} onClick={onClick} aria-label={label}>
            {children}
            <Tooltip label={label} disabled={tooltipDisabled} />
        </button>
    );
}

/* ---------- Icons ---------- */
function HomeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    );
}
function ProjectsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
    );
}
function WorkIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
    );
}
function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
    );
}

/* ---------- Language Switch ---------- */
function LanguageRow({
                         label,
                         checked,
                         onChange,
                     }: {
    label: string;
    checked: boolean; // false=IT true=EN
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-black/80 dark:text-white/80">{label}</div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                className="relative h-8 w-14 rounded-full bg-black/15 dark:bg-white/15"
                aria-label={label}
            >
                {!checked ? (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">🇮🇹</span>
                ) : (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">🇬🇧</span>
                )}

                <span
                    className={[
                        "pointer-events-none absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full",
                        "bg-white shadow-sm transition-transform duration-300 ease-out dark:bg-zinc-950",
                        checked ? "translate-x-0" : "translate-x-6",
                    ].join(" ")}
                />
            </button>
        </div>
    );
}

/* ---------- Dark Mode Toggle ---------- */
function DarkModeRow({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    const t = useT();
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-black/80 dark:text-white/80">{t.nav.darkMode}</div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={[
                    "relative h-8 w-14 rounded-full transition-colors",
                    checked ? "bg-orange-600 dark:bg-orange-500" : "bg-black/15 dark:bg-white/15",
                ].join(" ")}
                aria-label={t.nav.darkMode}
            >
        <span
            className={[
                "absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out dark:bg-zinc-950",
                checked ? "translate-x-6" : "translate-x-0",
            ].join(" ")}
        />
            </button>
        </div>
    );
}

/* ---------- Navbar ---------- */
export default function Navbar() {
    const t = useT();
    const { lang, setLang, theme, toggleTheme } = useApp();

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const pathname = usePathname();
    const router = useRouter();
    const isMobile =
        typeof window !== "undefined" && window.innerWidth < 1024;


    const [workHint, setWorkHint] = useState(false);

    function goToAnchor(id: string) {
        if (pathname !== "/") {
            router.push(`/#${id}`);
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${id}`);
    }

    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("mousedown", onDown);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const linkClass =
        "group relative grid h-11 w-11 place-items-center rounded-2xl bg-transparent transition " +
        "hover:opacity-80 active:scale-[0.98]";

    function triggerWorkHint() {
        setWorkHint(true);
        window.setTimeout(() => setWorkHint(false), 900);
    }

    return (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
            <div className="flex items-center gap-2 rounded-3xl bg-white/70 p-2 text-black shadow-md backdrop-blur dark:bg-zinc-900/70 dark:text-white">
                <Link
                    href="/#home"
                    scroll={false}
                    aria-label={t.nav.home}
                    className={linkClass}
                    onClick={(e) => {
                        e.preventDefault();
                        goToAnchor("home");
                    }}
                >
                    <HomeIcon />
                    <Tooltip label={t.nav.home} disabled={open} />
                </Link>

                <Link
                    href={isMobile ? "/projects#all-projects" : "/projects"}
                    aria-label={t.nav.projects}
                    className={linkClass}
                >
                    <ProjectsIcon />
                    <Tooltip label={t.nav.projects} disabled={open} />
                </Link>

                <div className="relative">
                    <IconButton
                        label={t.nav.work}
                        as="a"
                        href="/#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            triggerWorkHint();
                            goToAnchor("contact");
                        }}
                        tooltipDisabled={open}
                    >
                        <WorkIcon />
                    </IconButton>

                    <div
                        className={[
                            "pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap",
                            "rounded-2xl bg-white/80 px-3 py-1 text-xs text-black/80 shadow-sm backdrop-blur dark:bg-zinc-900/80 dark:text-white/80",
                            "transition-all duration-300 ease-out",
                            workHint ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
                        ].join(" ")}
                    >
                        {t.nav.work}
                    </div>
                </div>

                <div className="relative" ref={menuRef}>
                    <IconButton label={t.nav.settings} onClick={() => setOpen((v) => !v)} tooltipDisabled={open}>
                        <SettingsIcon />
                    </IconButton>

                    <div
                        className={[
                            "absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 rounded-3xl bg-white/80 p-4 shadow-md backdrop-blur dark:bg-zinc-950/70",
                            "transition-all duration-300 ease-out",
                            open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none",
                        ].join(" ")}
                    >
                        <div className="mb-3 text-sm font-semibold text-black/90 dark:text-white/90">{t.nav.settings}</div>

                        <div className="space-y-4">
                            <LanguageRow
                                label={t.nav.language}
                                checked={lang === "en"}
                                onChange={(v) => setLang(v ? "en" : "it")}
                            />
                            <DarkModeRow checked={theme === "dark"} onChange={() => toggleTheme()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
