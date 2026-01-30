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
        const { name, email, message, company } = body as {
            name?: string;
            email?: string;
            message?: string;
            company?: string; // honeypot
        };

        // Honeypot: if filled, silently accept (or reject). I prefer silent accept.
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

        const to = process.env.CONTACT_TO_EMAIL;
        const from = process.env.CONTACT_FROM_EMAIL;

        if (!to || !from) {
            return NextResponse.json({ error: "Email configuration missing" }, { status: 500 });
        }

        // --- Send email ---
        await resend.emails.send({
            // Use a verified sender/domain in Resend (e.g. contact@mickrbl.dev)
            from,
            to,
            subject: `New contact from ${name}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
