import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message, company, phone, serviceInterest } = data;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Full Name, Business Email, and Challenge Description are required." },
        { status: 400 }
      );
    }

    // If RESEND_API_KEY is configured in env, attempt to forward email
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Pivot Inquiry <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL || "pivotsc123@gmail.com",
            subject: `🚀 New Inquiry: ${serviceInterest || "General"} - ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #071A2F; color: #FFFFFF; border-radius: 12px;">
                <h2 style="color: #27A7A2; border-bottom: 1px solid rgba(39,167,162,0.3); padding-bottom: 10px;">New PIVOT Enquiry</h2>
                <p><strong>Full Name:</strong> ${name}</p>
                <p><strong>Business Email:</strong> ${email}</p>
                <p><strong>Company / Organization:</strong> ${company || "Not provided"}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Interest / Challenge:</strong> ${serviceInterest || "Not specified"}</p>
                <p><strong>Details:</strong></p>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Resend delivery failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Enquiry received successfully." });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error." },
      { status: 500 }
    );
  }
}
