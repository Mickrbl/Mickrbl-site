import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type RateEntry = { count: number; resetAt: number };

// Very small in-memory rate limiter (best-effort on serverless)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests / minute per IP
const rateMap = new Map<string, RateEntry>();

function getClientIp(req: Request) {
    // Vercel headers
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    const rip = req.headers.get("x-real-ip");
    if (rip) return rip.trim();
    return "unknown";
}

function isRateLimited(ip: string) {
    const now = Date.now();
    const curr = rateMap.get(ip);

    if (!curr || now > curr.resetAt) {
        rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (curr.count >= RATE_LIMIT_MAX) return true;

    curr.count += 1;
    rateMap.set(ip, curr);
    return false;
}

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, message, company, lang } = body as {
            name?: string;
            email?: string;
            message?: string;
            company?: string; // honeypot
            lang?: "it" | "en";
        };

        // Honeypot: if filled, silently accept
        if (company && company.trim().length > 0) {
            return NextResponse.json({ ok: true });
        }

        // --- Basic validation ---
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        const isIt = lang === "it";

        // --- 1) Send email to you ---
        await resend.emails.send({
            from: "Mickrbl Portfolio <contact@mickrbl.dev>",
            to: process.env.CONTACT_TO_EMAIL as string,
            subject: `New contact from ${name}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
        });

        // --- 2) Auto-reply to the sender (IT/EN) ---
        const autoSubject = isIt ? "Grazie per avermi scritto!" : "Thanks for reaching out!";
        const autoText = isIt
            ? `Ciao ${name},\n\n` +
            `grazie per avermi scritto — ho ricevuto il tuo messaggio e ti risponderò il prima possibile.\n\n` +
            `— Mickol\n\n` +
            `---\n` +
            `Copia del tuo messaggio:\n` +
            `${message}\n`
            : `Hi ${name},\n\n` +
            `Thanks for reaching out — I received your message and I’ll get back to you as soon as possible.\n\n` +
            `— Mickol\n\n` +
            `---\n` +
            `Your message (copy):\n` +
            `${message}\n`;

        await resend.emails.send({
            from: "Mickol – Mickrbl <contact@mickrbl.dev>",
            to: email,
            subject: autoSubject,
            text: autoText,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
