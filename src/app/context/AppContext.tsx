"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "it" | "en";
type Theme = "light" | "dark";

type AppState = {
    lang: Lang;
    setLang: (l: Lang) => void;
    theme: Theme;
    toggleTheme: () => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("it");
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const savedLang = (localStorage.getItem("lang") as Lang) ?? "it";

        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        const initialTheme: Theme = savedTheme ?? (systemPrefersDark ? "dark" : "light");

        document.documentElement.classList.toggle("dark", initialTheme === "dark");

        setLang(savedLang);
        setTheme(initialTheme);
    }, []);


    function updateLang(l: Lang) {
        setLang(l);
        localStorage.setItem("lang", l);
    }

    function toggleTheme() {
        setTheme((t) => {
            const next: Theme = t === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            document.documentElement.classList.toggle("dark", next === "dark");
            return next;
        });
    }

    return <AppContext.Provider value={{ lang, setLang: updateLang, theme, toggleTheme }}>{children}</AppContext.Provider>;
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used inside AppProvider");
    return ctx;
}
