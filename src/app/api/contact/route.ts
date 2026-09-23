import { NextResponse } from "next/server";

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a message with at least 10 characters." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      message: message.trim().slice(0, 2000),
      receivedAt: new Date().toISOString(),
    };

    // If an email dispatch service is configured (Resend / SendGrid / SMTP), dispatch here.
    // e.g. process.env.RESEND_API_KEY, process.env.CONTACT_EMAIL_RECIPIENT
    const isDispatchConfigured = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);

    if (isDispatchConfigured && sanitizedData.email) {
      // Production mailer hook:
      // await sendEmail({ to: process.env.CONTACT_EMAIL_RECIPIENT, ...sanitizedData });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received by the Milagris Cathedral parish office.",
        referenceId: `MC-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
