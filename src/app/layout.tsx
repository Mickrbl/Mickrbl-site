import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { AppProvider } from "@/app/context/AppContext";

export const metadata: Metadata = {
    metadataBase: new URL("https://mickrbl.dev"),

    title: {
        default: "Mickol Roe Baronia Lasquety",
        template: "%s | Mickol Roe Baronia Lasquety",
    },

    description: "Cinema and Media Engineering graduate",

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
    },

    icons: {
        icon: "/icon.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="it" suppressHydrationWarning>
        <body className="min-h-screen bg-white text-black dark:bg-zinc-950">
        <AppProvider>
            <Navbar />
            {children}
        </AppProvider>
        </body>
        </html>
    );
}
