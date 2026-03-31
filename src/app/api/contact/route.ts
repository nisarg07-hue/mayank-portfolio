import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Ensure API Key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable. Skipping email delivery.");
      // We return success anyway so the frontend shows a nice message, since it's saved to Firestore
      return NextResponse.json({ success: true, warning: "Missing Resend API Key" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const destinationEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@example.com";

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Typically you'd use a verified domain here
      to: [destinationEmail],
      subject: `New Portfolio Enquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Let's Cut Something!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; font-family: sans-serif; padding: 12px; background: #f4f4f4; border-radius: 4px;">${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
