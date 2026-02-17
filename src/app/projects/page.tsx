"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/app/context/AppContext";
import { dict } from "@/app/i18n";

/* -------------------- TYPES -------------------- */

type Project = {
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    repoUrl: string;
    tags?: string[];
};

/* -------------------- DATA -------------------- */

const projects: Project[] = [
    {
        title: "CrimeUK – Geospatial Crime Data Visualization Platform",
        description:
            "Interactive web app for visualizing UK crime data on maps, with date and area-based filtering.",
        image: "/crimeuk_image.png",
        liveUrl: "https://crime-uk.vercel.app/",
        repoUrl: "https://github.com/Mickrbl/CrimeUK",
        tags: ["React", "TypeScript", "REST API", "useReducer", "Interactive Maps"],
    },
    {
        title: "DoughFinder – Crowdfunding App",
        description:
            "Full-stack web application with authentication, campaign management, donations, and cloud-based image storage.",
        image: "/doughfinder_miniature.png",
        liveUrl: "https://site--doughfinder--s6d5dq7mdt7r.code.run/",
        repoUrl: "https://github.com/Mickrbl/doughfinder",
        tags: ["Python", "Flask", "Jinja2", "PostgreSQL", "Cloudinary"],
    },
];

/* -------------------- REVEAL ON SCROLL -------------------- */

function Reveal({
                    children,
                    className = "",
                    delayMs = 0,
                }: {
    children: React.ReactNode;
    className?: string;
    delayMs?: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={[
                "transition-all duration-700 ease-out will-change-transform",
                shown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
                className,
            ].join(" ")}
            style={{ transitionDelay: `${delayMs}ms` }}
        >
            {children}
        </div>
    );
}

/* -------------------- ICONS -------------------- */

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h8v8" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.34-3.35-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.21-.25-4.54-1.1-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8c.85 0 1.71.12 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.67-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[20px] w-[20px]"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M20.45 20.45h-3.56v-5.6c0-1.34-.03-3.07-1.87-3.07-1.88 0-2.16 1.46-2.16 2.97v5.7H9.3V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM3.56 20.45h3.56V9H3.56v11.45z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[20px] w-[20px]"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 4.2a3.8 3.8 0 110 7.6 3.8 3.8 0 010-7.6zM12 10a2 2 0 100 4 2 2 0 000-4zm5.6-2.1a.9.9 0 110 1.8.9.9 0 010-1.8z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[20px] w-[20px]"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 0l6 4.5L18 6H6zm12 2.5l-6 4.5-6-4.5V18h12V8.5z" />
        </svg>
    );
}

/* -------------------- COMPONENTS -------------------- */

function ProjectCard({ p, repoText }: { p: Project; repoText: string }) {
    function openRepo(e: React.MouseEvent) {
        e.stopPropagation();
        window.open(p.repoUrl, "_blank", "noreferrer");
    }

    return (
        <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.10]"
        >
            <div className="pointer-events-none absolute right-5 top-5 text-orange-800/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-orange-400/80">
                <ArrowIcon />
            </div>

            <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start sm:gap-5 sm:px-6 sm:py-5">
                <div className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-black/10 sm:w-28 md:w-32 dark:bg-white/10">
                    <div className="relative aspect-[10/11] w-full">
                        <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </div>
                </div>

                <div className="min-w-0 flex-1 pr-0 sm:pr-10">
                    <h3 className="text-base font-semibold tracking-tight text-black/90 transition-colors group-hover:text-black sm:text-lg dark:text-white dark:group-hover:text-white">
                        {p.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                        {p.description}
                    </p>

                    {p.tags && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[10px] leading-none text-black/70 transition-colors group-hover:bg-black/[0.12] dark:bg-white/[0.10] dark:text-white/70 dark:group-hover:bg-white/[0.16]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 space-y-2">
                        <button
                            type="button"
                            onClick={openRepo}
                            className="inline-flex items-center gap-2 text-left text-xs text-black/65 transition hover:text-black dark:text-white/60 dark:hover:text-white"
                            aria-label="Open GitHub repository"
                        >
                            <span className="text-black/70 dark:text-white/70">
                                <GitHubIcon />
                            </span>
                            <span>{repoText}</span>
                        </button>
                    </div>
                </div>
            </div>
        </a>
    );
}


function OngoingCard({
                         title,
                         desc,
                         repoText,
                     }: {
    title: string;
    desc: string;
    repoText: string;
}) {
    function openGitHub() {
        window.open("https://github.com/Mickrbl", "_blank", "noreferrer");
    }

    return (
        <div className="w-full overflow-hidden rounded-3xl bg-white/70 p-6 shadow-md backdrop-blur dark:bg-zinc-900/70">
            <h3 className="text-base font-semibold tracking-tight text-black/90 sm:text-lg dark:text-white/90">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {desc}
            </p>

            <button
                type="button"
                onClick={openGitHub}
                className="mt-4 inline-flex items-center gap-2 text-left text-xs text-black/65 transition hover:text-black dark:text-white/60 dark:hover:text-white"
                aria-label="Open GitHub profile"
            >
        <span className="text-black/70 dark:text-white/70">
          <GitHubIcon />
        </span>
                <span>{repoText}</span>
            </button>
        </div>
    );
}

/* -------------------- PAGE -------------------- */

export default function ProjectsPage() {
    const [pageIn, setPageIn] = useState(false);
    const { lang } = useApp();
    const t = dict[lang].projectsPage;

    useEffect(() => {
        const id = requestAnimationFrame(() => setPageIn(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // ✅ SOLO TRADUZIONE (fix): usa chiavi esistenti in i18n.ts
    const pCrime: Project = { ...projects[0], description: t.projectDesc.crimeuk };
    const pDough: Project = { ...projects[1], description: t.projectDesc.doughfinder };

    return (
        <main
            className={[
                "mx-auto max-w-6xl px-4 pt-28 pb-12 transition-all duration-700 ease-out",
                pageIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
            ].join(" ")}
        >
            <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <Reveal>
                        <div className="rounded-3xl bg-white p-6 shadow-md">
                            <div className="mx-auto w-full max-w-[240px]">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-black/10">
                                    <Image
                                        src="/profilepic.png"
                                        alt="Mickol Roe Baronia Lasquety"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <h1 className="whitespace-nowrap text-2xl font-semibold tracking-tight text-black">
                                    Mickol Roe Baronia Lasquety
                                </h1>

                                <p className="mt-1 text-sm text-black/70">{t.cineLine}</p>

                                <p className="mt-4 text-sm leading-relaxed text-black/60">{t.bio}</p>

                                <div className="mt-6 flex justify-center gap-3 text-orange-600">
                                    {[
                                        { href: "https://github.com/Mickrbl", label: "GitHub", Icon: GitHubIcon },
                                        { href: "https://linkedin.com/in/mickolroe", label: "LinkedIn", Icon: LinkedInIcon },
                                        { href: "https://www.instagram.com/struggle_time", label: "Instagram", Icon: InstagramIcon },
                                        { href: "mailto:mickol.lasquety@gmail.com", label: "Email", Icon: MailIcon },
                                    ].map(({ href, label, Icon }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                                            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                                            className="rounded-2xl p-2 transition hover:bg-black/[0.06]"
                                            aria-label={label}
                                            title={label}
                                        >
                                            <Icon />
                                        </a>
                                    ))}
                                </div>

                                <a
                                    href="/cv_Mickol_Lasquety.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black dark:bg-orange-500 px-4 py-2.5 text-sm font-medium text-white"
                                >
                                    Get my CV
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </aside>

                <section className="space-y-10">
                    <Reveal>
                        <section>
                            <div id="all-projects" className="leading-[0.82] scroll-mt-28">
                                <h2 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-black dark:text-white">
                                    {t.all}
                                </h2>

                                <div className="-mt-2 text-5xl font-extrabold tracking-tight opacity-25 dark:opacity-100 sm:text-7xl text-black dark:text-orange-400">
                                    {t.projects}
                                </div>
                            </div>

                            <div className="mt-6 space-y-0">
                                <ProjectCard p={pCrime} repoText={t.repoNormal} />
                                <ProjectCard p={pDough} repoText={t.repoNormal} />

                                <div className="mt-6">
                                    <OngoingCard title={t.ongoingTitle} desc={t.ongoingDesc} repoText={t.repoOngoing} />
                                </div>
                            </div>
                        </section>
                    </Reveal>
                </section>
            </div>
        </main>
    );
}
