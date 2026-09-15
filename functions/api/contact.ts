export async function onRequestPost(context: {
  request: Request;
  env: {
    RESEND_API_KEY: string;
  };
}) {
  try {
    const data = await context.request.json();
    const { name, company, email, phone, budget, message } = data;

    // Server-side validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, Email, and Message are required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";

    // Call Resend API via fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Pivot Inquiry <onboarding@resend.dev>",
        to: "karinivedita6302@gmail.com",
        subject: "🚀 New Project Inquiry - Pivot Website",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 12px; background-color: #071A2F; color: #FFFFFF;">
            <h2 style="color: #27A7A2; border-bottom: 2px solid #27A7A2; padding-bottom: 12px; font-size: 22px; margin-top: 0;">🚀 New Project Inquiry - Pivot Website</h2>
            <p style="color: #D9E8F4; font-size: 15px; leading: 1.6;">A new project inquiry has been submitted through the Pivot website.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 24px; color: #FFFFFF; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6FD7B7; width: 160px; border-bottom: 1px solid rgba(255,255,255,0.08);">Full Name:</td>
                <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.08);">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6FD7B7; border-bottom: 1px solid rgba(255,255,255,0.08);">Company:</td>
                <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.08);">${company || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6FD7B7; border-bottom: 1px solid rgba(255,255,255,0.08);">Email Address:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08);"><a href="mailto:${email}" style="color: #27A7A2; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6FD7B7; border-bottom: 1px solid rgba(255,255,255,0.08);">Phone Number:</td>
                <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.08);">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6FD7B7; border-bottom: 1px solid rgba(255,255,255,0.08);">Budget Range:</td>
                <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.08);">${budget || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6FD7B7; vertical-align: top; padding-top: 10px;">Project Details:</td>
                <td style="padding: 10px 0; color: #D9E8F4; white-space: pre-wrap; line-height: 1.6;">${message}</td>
              </tr>
            </table>
            
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;" />
            <p style="font-size: 11px; color: #D9E8F4; opacity: 0.6; margin: 0;">
              Website: <strong>Pivot Production Environment</strong><br />
              Submission Timestamp: <strong>${timestamp}</strong>
            </p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: `Resend mailing endpoint failure: ${errText}` }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
