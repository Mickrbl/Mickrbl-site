import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { AppProvider } from "@/app/context/AppContext";

export const metadata: Metadata = {
    title: "Mickol Roe Baronia Lasquety — Portfolio",
    description: "Portfolio di Mickol Roe Baronia Lasquety. Bio, progetti e contatti.",
    icons: {
        icon: "/favicon.png", // oppure /favicon.ico
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="it" className="" suppressHydrationWarning>
        <body className="min-h-screen bg-white text-black dark:bg-zinc-950 ">
        <AppProvider>
            <Navbar />
            {children}
        </AppProvider>
        </body>
        </html>
    );
}
