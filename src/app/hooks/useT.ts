"use client";

import { useApp } from "@/app/context/AppContext";
import { dict } from "@/app/i18n";

export function useT() {
    const { lang } = useApp();
    return dict[lang];
}
