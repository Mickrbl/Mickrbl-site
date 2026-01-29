import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { AppProvider } from "@/app/context/AppContext";

export const metadata: Metadata = {
    title: "Mickol Roe Baronia Lasquety",
    description: "Mickol Roe Baronia Lasquety | Software Developer",
    icons: {
        icon: "/icon.png",
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
