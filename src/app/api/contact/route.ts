import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // --- Validazione base ---
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!email.includes("@")) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // --- Invio email ---
        await resend.emails.send({
            from: "Mickol Roe Baronia Lasquety <contact@mickrbl.dev>",
            to: process.env.CONTACT_TO_EMAIL as string,
            subject: `New contact from ${name}`,
            replyTo: email,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
