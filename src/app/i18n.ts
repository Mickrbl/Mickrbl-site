// src/app/i18n.ts
export type Lang = "it" | "en";

type SubtitleMap = Partial<Record<string, string>>;

export const dict = {
    it: {
        nav: {
            home: "Home",
            projects: "Progetti",
            work: "Lavoriamo insieme",
            settings: "Impostazioni",
            language: "Lingua",
            darkMode: "Modalità scura",
        },

        homePage: {
            aboutTitle: "CHI SONO",
            recentTitleTop: "RECENTI",
            recentTitleBottom: "PROGETTI",
            viewAll: "Vedi tutti i progetti",

            technologiesTitle: "TECNOLOGIE",
            toolsTitle: "STRUMENTI",

            contactTop: "LAVORIAMO",
            contactBottom: "INSIEME",

            form: {
                name: "Nome",
                namePh: "Il tuo nome",
                email: "Email",
                emailPh: "La tua email",
                message: "Messaggio",
                messagePh: "Il tuo messaggio",
                submit: "Invia",
            },

            profileLine:
                "Ingegnere del Cinema e dei Mezzi di Comunicazione • Politecnico di Torino",

            techSubtitleByName: {
                Python: "Linguaggio di programmazione",
                SQL: "Database relazionali",
                JavaScript: "Linguaggio di programmazione",
                TypeScript: "Linguaggio di programmazione",
                React: "Libreria UI",
                "Next.js": "Framework React",
                Flask: "Framework backend (Python)",
                "Tailwindcss/Bootstrap": "Framework CSS",
            } as SubtitleMap,

            toolsSubtitleByName: {
                Git: "Sistema di versionamento",
                GitHub: "Hosting codice & collaborazione",
                Vercel: "Piattaforma di hosting",
                PostgreSQL: "Database relazionale",
                Cloudinary: "Storage media",
            } as SubtitleMap,
        },

        projectsPage: {
            all: "TUTTI",
            projects: "PROGETTI",
            repoNormal: "Se vuoi più dettagli o sei curioso, visita la repository.",
            repoOngoing:
                "Nel frattempo, sentiti libero di esplorare il mio GitHub per lavori in corso ed esperimenti.",
            ongoingTitle: "Progetti in corso e futuri",
            ongoingDesc:
                "Progetti aggiuntivi attualmente in sviluppo, inclusi un chatbot basato su LLM ed esercizi orientati ai sistemi.",
            bio:
                "Junior software developer interessato a costruire sistemi software e applicazioni affidabili e data-driven.",

            // ✅ AGGIUNTE per far funzionare la pagina Projects
            cineLine:
                "Ingegnere del Cinema e dei Mezzi di Comunicazione • Politecnico di Torino",
            projectDesc: {
                crimeuk:
                    "Web app interattiva per visualizzare i dati sulla criminalità nel Regno Unito su mappe, con filtri per data e area.",
                doughfinder:
                    "Applicazione full-stack con autenticazione, gestione campagne, donazioni e storage immagini su cloud.",
            },
        },
    },

    en: {
        nav: {
            home: "Home",
            projects: "Projects",
            work: "Let's work together",
            settings: "Settings",
            language: "Language",
            darkMode: "Dark mode",
        },

        homePage: {
            aboutTitle: "ABOUT ME",
            recentTitleTop: "RECENT",
            recentTitleBottom: "PROJECTS",
            viewAll: "View all projects",

            technologiesTitle: "TECHNOLOGIES",
            toolsTitle: "TOOLS",

            contactTop: "LET'S WORK",
            contactBottom: "TOGETHER",

            form: {
                name: "Name",
                namePh: "Your name",
                email: "Email",
                emailPh: "Your email",
                message: "Message",
                messagePh: "Your message",
                submit: "Submit",
            },

            profileLine: "Cinema and Media Engineering graduate • Politecnico di Torino",

            techSubtitleByName: {
                Python: "Programming Language",
                SQL: "Relational Databases",
                JavaScript: "Programming Language",
                TypeScript: "Programming Language",
                React: "UI Library",
                "Next.js": "React Framework",
                Flask: "Backend Framework (Python)",
                "Tailwindcss/Bootstrap": "CSS Frameworks",
            } as SubtitleMap,

            toolsSubtitleByName: {
                Git: "Version Control System",
                GitHub: "Code Hosting & Collaboration",
                Vercel: "Hosting Platform",
                PostgreSQL: "Relational Database",
                Cloudinary: "Media Storage",
            } as SubtitleMap,
        },

        projectsPage: {
            all: "ALL",
            projects: "PROJECTS",
            repoNormal: "If you want more details or you’re curious, visit the repository.",
            repoOngoing:
                "In the meantime, feel free to explore my GitHub for ongoing work and experiments.",
            ongoingTitle: "Ongoing & Upcoming Projects",
            ongoingDesc:
                "Additional projects currently in development, including an LLM-based chatbot and system-oriented exercises.",
            bio:
                "Junior software developer interested in building reliable, data-driven software systems and applications.",

            // ✅ AGGIUNTE per far funzionare la pagina Projects
            cineLine: "Cinema and Media Engineering graduate • Politecnico di Torino",
            projectDesc: {
                crimeuk:
                    "Interactive web app for visualizing UK crime data on maps, with date and area-based filtering.",
                doughfinder:
                    "Full-stack web application with authentication, campaign management, donations, and cloud-based image storage.",
            },
        },
    },
} as const;
