import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
    title: "Mickol Roe Baronia Lasquety— Portfolio",
    description: "Portfolio di Il Tuo Nome. Bio, progetti e contatti.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="it">
        <body className="min-h-screen bg-white text-black">
        <Navbar />
        {children}
        </body>
        </html>
    );
}
