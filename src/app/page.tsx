"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/app/context/AppContext";
import { dict } from "@/app/i18n";

/* -------------------- TYPES -------------------- */

type Project = {
    title: string;
    image: string;
    href: string;
    tags?: string[];
};

type Tool = {
    name: string;
    subtitle: string;
    icon: string;
};

/* -------------------- DATA -------------------- */

const projects: Project[] = [
    {
        title: "CrimeUK – Geospatial Crime Data Visualization Platform",
        image: "/crimeuk_image.png",
        href: "https://crime-uk.vercel.app/",
        tags: ["React", "Typescript", "REST API", "useReducer", "Interactive Maps"],
    },
    {
        title: "DoughFinder – Crowdfunding App",
        image: "/doughfinder_miniature.png",
        href: "https://doughfinder.onrender.com/",
        tags: ["Python", "Flask", "Jinja2", "PostgreSQL", "Cloudinary"],
    },
];

const technologies: Tool[] = [
    { name: "Python", subtitle: "Programming Language", icon: "/python.png" },
    { name: "SQL", subtitle: "Relational Databases", icon: "/sql.png" },
    { name: "JavaScript", subtitle: "Programming Language", icon: "/js.png" },
    { name: "TypeScript", subtitle: "Programming Language", icon: "/typescript.png" },
    { name: "React", subtitle: "UI Library", icon: "/reacts.png" },
    { name: "Next.js", subtitle: "React Framework", icon: "/next.png" },
    { name: "Flask", subtitle: "Backend Framework (Python)", icon: "/flasks.png" },
    { name: "Tailwindcss/Bootstrap", subtitle: "CSS Frameworks", icon: "/tail_boot.png" },
];

const tools: Tool[] = [
    { name: "Git", subtitle: "Version Control System", icon: "/git.png" },
    { name: "GitHub", subtitle: "Code Hosting & Collaboration", icon: "/github.png" },
    { name: "Vercel", subtitle: "Hosting Platform", icon: "/vercels.png" },
    { name: "PostgreSQL", subtitle: "Relational Database", icon: "/postgresql.png" },
    { name: "Cloudinary", subtitle: "Media Storage", icon: "/cloudinary.png" },
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
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h8v8" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.34-3.35-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.21-.25-4.54-1.1-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8c.85 0 1.71.12 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.67-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.6c0-1.34-.03-3.07-1.87-3.07-1.88 0-2.16 1.46-2.16 2.97v5.7H9.3V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM3.56 20.45h3.56V9H3.56v11.45z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor" aria-hidden="true">
            <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 4.2a3.8 3.8 0 110 7.6 3.8 3.8 0 010-7.6zM12 10a2 2 0 100 4 2 2 0 000-4zm5.6-2.1a.9.9 0 110 1.8.9.9 0 010-1.8z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor" aria-hidden="true">
            <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 0l6 4.5L18 6H6zm12 2.5l-6 4.5-6-4.5V18h12V8.5z" />
        </svg>
    );
}

/* -------------------- COMPONENTS -------------------- */

function ProjectRow({ p }: { p: Project }) {
    return (
        <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block w-full overflow-hidden rounded-3xl transition-all duration-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.10]"
        >
            <div className="pointer-events-none absolute right-5 top-5 text-orange-800/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-orange-400/80">
                <ArrowIcon />
            </div>

            <div className="flex items-center gap-4 px-5 py-4 sm:gap-5 sm:px-6 sm:py-5">
                <div className="relative w-20 shrink-0 overflow-hidden rounded-2xl bg-black/10 sm:w-24 md:w-28 dark:bg-white/10">
                    <div className="relative aspect-[10/11] w-full">
                        <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </div>
                </div>

                <div className="min-w-0 flex-1 pr-10">
                    {/* ✅ FIX: in dark, hover stays white */}
                    <h3 className="text-base font-semibold tracking-tight text-black/90 transition-colors group-hover:text-black sm:text-lg dark:text-white dark:group-hover:text-white">
                        {p.title}
                    </h3>

                    {p.tags && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[10px] leading-none text-black/70 transition-colors group-hover:bg-black/[0.12]
                             dark:bg-white/[0.10] dark:text-white/70 dark:group-hover:bg-white/[0.16]"
                                >
                  {t}
                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
}

function ViewAllProjectsRow({ label }: { label: string }) {
    return (
        <a href="/projects" className="group relative block w-full overflow-hidden rounded-3xl bg-transparent">
            <div className="pointer-events-none absolute right-5 top-5 text-black/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-white/45">
                <ArrowIcon />
            </div>

            <div className="flex items-center justify-end px-5 py-4 sm:px-6 sm:py-5">
        <span className="pr-10 text-xs font-medium tracking-tight text-black/55 transition-colors duration-300 group-hover:text-black dark:text-white/55 dark:group-hover:text-white">
          {label}
        </span>
            </div>
        </a>
    );
}

function TechCard({ t }: { t: Tool }) {
    return (
        <div className="flex items-center gap-4 rounded-3xl bg-white/70 p-5 shadow-md backdrop-blur dark:bg-zinc-900/70">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-sm">
                <Image src={t.icon} alt={t.name} fill className="object-contain p-2" />
            </div>

            <div>
                <div className="text-base font-semibold tracking-tight text-black/90 dark:text-white">
                    {t.name}
                </div>
                <div className="mt-1 text-sm text-black/60 dark:text-white/60">{t.subtitle}</div>
            </div>
        </div>
    );
}

/* -------------------- PAGE -------------------- */

export default function HomePage() {
    const [pageIn, setPageIn] = useState(false);

    const { lang } = useApp();
    const t = dict[lang].homePage;

    useEffect(() => {
        const id = requestAnimationFrame(() => setPageIn(true));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        function scrollFromHash() {
            const id = window.location.hash.replace("#", "");
            if (!id) return;

            const el = document.getElementById(id);
            if (!el) return;

            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        scrollFromHash();
        window.addEventListener("hashchange", scrollFromHash);
        return () => window.removeEventListener("hashchange", scrollFromHash);
    }, []);

    const accent = "dark:text-orange-500";

    // ✅ Traduzione “subtitles” senza cambiare i data array
    const technologiesT: Tool[] = technologies.map((x) => ({
        ...x,
        subtitle: t.techSubtitleByName[x.name as keyof typeof t.techSubtitleByName] ?? x.subtitle,
    }));

    const toolsT: Tool[] = tools.map((x) => ({
        ...x,
        subtitle: t.toolsSubtitleByName[x.name as keyof typeof t.toolsSubtitleByName] ?? x.subtitle,
    }));

    return (
        <main
            className={[
                "mx-auto max-w-6xl px-4 pt-28 pb-12 transition-all duration-700 ease-out",
                pageIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
            ].join(" ")}
        >
            <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
                {/* LEFT — STICKY CARD */}
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <Reveal>
                        <div className="rounded-3xl bg-white/70 p-6 shadow-md backdrop-blur dark:bg-zinc-900/70">
                            <div className="mx-auto w-full max-w-[240px]">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-black/10 dark:bg-white/10">
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
                                <h1 className="whitespace-nowrap text-2xl font-semibold tracking-tight dark:text-white">
                                    Mickol Roe Baronia Lasquety
                                </h1>

                                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                                    {t.profileLine}
                                </p>

                                <p className="mt-4 text-sm leading-relaxed text-black/70 dark:text-white/70">
                                    {lang === "it"
                                        ? "Junior software developer interessato a costruire sistemi software e applicazioni affidabili e data-driven."
                                        : "Junior software developer interested in building reliable, data-driven software systems and applications."}
                                </p>

                                <div className="mt-6 flex justify-center gap-3 text-orange-600 dark:text-orange-400">
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
                                            className="rounded-2xl p-2 transition hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                                            aria-label={label}
                                            title={label}
                                        >
                                            <Icon />
                                        </a>
                                    ))}
                                </div>

                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:opacity-90
                             dark:bg-orange-500 dark:text-black"
                                >
                                    Get my CV
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </aside>

                {/* RIGHT — CONTENT */}
                <section className="space-y-16">
                    {/* ABOUT ME */}
                    <Reveal>
                        <section id="home" className="scroll-mt-28">
                            <h2 className="text-3xl font-semibold uppercase tracking-wide dark:text-white">
                                {t.aboutTitle}
                            </h2>

                            <p className="mt-3 text-sm leading-relaxed text-justify text-black/75 dark:text-white/70">
                                {lang === "it" ? (
                                    <>
                                        Sono un neolaureato in Ingegneria del Cinema e dei Mezzi di Comunicazione al <span className="font-bold">Politecnico di Torino</span>.
                                        Nel tempo mi sono avvicinato allo sviluppo software, interessandomi soprattutto a come vengono progettate le applicazioni e ai principi che ne guidano la struttura.
                                        Questo mi ha aiutato a imparare nuove tecnologie con rapidità e ad <span className="font-bold">adattarmi con naturalezza a contesti tecnici diversi</span>.
                                        <br />
                                        <br />
                                        Prima di completare la laurea ho maturato diverse esperienze nel settore cinematografico, collaborando all’interno di team con scadenze strette e feedback continui.
                                        Queste esperienze hanno rafforzato le mie capacità di comunicazione, il lavoro di squadra e la gestione di situazioni complesse.
                                        <br />
                                        <br />
                                        Oggi sto mettendo in pratica queste competenze per crescere come <span className="font-bold">junior software developer</span>, continuando a imparare attraverso progetti concreti e sperimentazione.
                                        Mi interessa lavorare su soluzioni solide e ben strutturate, cercando di migliorare nel tempo sia dal punto di vista tecnico sia nel modo di affrontare i problemi
                                    </>
                                ) : (
                                    <>
                                        I am a recent graduate in Cinema and Media Engineering at{" "}
                                        <span className="font-bold">Politecnico di Torino</span>, with a growing interest in software development and system-level
                                        problem solving. My background combines creative training with an engineering mindset, which helps me work with technology in
                                        a structured and practical way.
                                        <br />
                                        <br />
                                        During my studies, I developed a solid understanding of how software systems work, from data handling to application logic.
                                        This helped me develop the ability to <span className="font-bold">learn new technologies quickly</span> and{" "}
                                        <span className="font-bold">adapt to unfamiliar technical environments</span>. I enjoy exploring how technical decisions
                                        influence the behavior, reliability, and usability of an application.
                                        <br />
                                        <br />
                                        Before completing my degree, I also worked in creative production environments, collaborating with teams under tight
                                        deadlines and responding to frequent feedback. These experiences taught me how to communicate clearly, work effectively with
                                        others, and stay focused in complex workflows.
                                        <br />
                                        <br />
                                        I am currently applying these skills to grow as a junior software developer, with a particular focus on reliable, data-driven
                                        systems and continuous learning through hands-on projects and experimentation.
                                    </>
                                )}
                            </p>
                        </section>
                    </Reveal>

                    {/* RECENT PROJECTS */}
                    <Reveal>
                        <section>
                            <div className="leading-[0.82]">
                                <h2 className="text-5xl font-extrabold tracking-tight sm:text-7xl dark:text-white">
                                    {t.recentTitleTop}
                                </h2>
                                <div
                                    className={[
                                        "-mt-2 text-5xl font-extrabold tracking-tight opacity-25 sm:text-7xl",
                                        accent,
                                        "dark:opacity-100",
                                    ].join(" ")}
                                >
                                    {t.recentTitleBottom}
                                </div>
                            </div>

                            <div className="mt-6 space-y-0">
                                {projects.map((p) => (
                                    <ProjectRow key={p.title} p={p} />
                                ))}
                                <ViewAllProjectsRow label={t.viewAll} />
                            </div>
                        </section>
                    </Reveal>

                    {/* TECHNOLOGIES */}
                    <Reveal>
                        <section>
                            <div className="leading-[0.9]">
                                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl dark:text-white">
                                    {t.technologiesTitle}
                                </h2>
                            </div>

                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                {technologiesT.map((x) => (
                                    <TechCard key={x.name} t={x} />
                                ))}
                            </div>
                        </section>
                    </Reveal>

                    {/* TOOLS */}
                    <Reveal>
                        <section>
                            <div className="leading-[0.9]">
                                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl dark:text-white">
                                    {t.toolsTitle}
                                </h2>
                            </div>

                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                {toolsT.map((x) => (
                                    <TechCard key={x.name} t={x} />
                                ))}
                            </div>
                        </section>
                    </Reveal>

                    {/* CONTACT */}
                    <Reveal>
                        <div className="lg:col-span-2 h-5" />
                        <section id="contact" className="scroll-mt-28 mt-24 rounded-3xl bg-transparent p-0 shadow-none">
                            <div className="leading-[0.78]">
                                <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl dark:text-white">
                                    {t.contactTop}
                                </h2>
                                <div
                                    className={[
                                        "-mt-2 text-5xl font-extrabold tracking-tight opacity-25 sm:text-6xl",
                                        accent,
                                        "dark:opacity-100",
                                    ].join(" ")}
                                >
                                    {t.contactBottom}
                                </div>
                            </div>

                            <form className="mt-6 grid gap-4 lg:grid-cols-2">
                                <div className="lg:col-span-1">
                                    <label className="mb-2 block text-xs text-black/60 dark:text-white/60">
                                        {t.form.name}
                                    </label>
                                    <input
                                        placeholder={t.form.namePh}
                                        className="w-full rounded-lg bg-white px-4 py-2.5 text-sm ring-1 ring-black/10 dark:bg-zinc-950 dark:ring-white/10 dark:text-white"
                                    />
                                </div>

                                <div className="lg:col-span-1">
                                    <label className="mb-2 block text-xs text-black/60 dark:text-white/60">
                                        {t.form.email}
                                    </label>
                                    <input
                                        placeholder={t.form.emailPh}
                                        className="w-full rounded-lg bg-white px-4 py-2.5 text-sm ring-1 ring-black/10 dark:bg-zinc-950 dark:ring-white/10 dark:text-white"
                                    />
                                </div>

                                <div className="lg:col-span-2">
                                    <label className="mb-2 block text-xs text-black/60 dark:text-white/60">
                                        {t.form.message}
                                    </label>
                                    <textarea
                                        rows={7}
                                        placeholder={t.form.messagePh}
                                        className="w-full rounded-lg bg-white px-4 py-2.5 text-sm ring-1 ring-black/10 dark:bg-zinc-950 dark:ring-white/10 dark:text-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="lg:col-span-2 w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white
                             dark:bg-orange-500 dark:text-black"
                                >
                                    {t.form.submit}
                                </button>

                                <div className="lg:col-span-2 h-32" />
                            </form>
                        </section>
                    </Reveal>

                    {/* FOOTER */}
                    <Reveal>
                        <footer className="pt-6 text-sm text-black/50 dark:text-white/50">
                            © {new Date().getFullYear()} Mickol Roe Baronia Lasquety
                        </footer>
                    </Reveal>
                </section>
            </div>
        </main>
    );
}
