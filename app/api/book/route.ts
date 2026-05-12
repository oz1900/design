import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Notify Vitaliy
    const { error: notifyError } = await resend.emails.send({
      from: "Greenberg Safety <noreply@greenbergsafety.com>",
      to: "Vitaliy@GreenbergSafety.com",
      replyTo: email,
      subject: `New consultation request — ${name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#2a3142">
          <div style="background:#0a1024;padding:24px 32px;border-radius:6px 6px 0 0">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase">
              Greenberg Safety — New booking request
            </p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px;padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:13px;color:#6b7280;width:120px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:15px;font-weight:600;color:#0a1024">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:15px;color:#0F4BF3"><a href="mailto:${email}" style="color:#0F4BF3">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:15px;color:#0a1024">${phone || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Date</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:15px;color:#0a1024">${date}</td></tr>
              <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Time</td>
                  <td style="padding:10px 0;font-size:15px;color:#0a1024">${time} CDT</td></tr>
            </table>
            <div style="margin-top:28px;padding:16px 20px;background:#f5f8ff;border-left:3px solid #0F4BF3;border-radius:0 4px 4px 0">
              <p style="margin:0;font-size:13px;color:#6b7280">Hit <strong style="color:#0a1024">Reply</strong> to respond directly to ${name}.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Resend notify error:", notifyError);
      return NextResponse.json(
        { error: `Email delivery failed: ${notifyError.message}` },
        { status: 500 }
      );
    }

    // Confirmation to the person who booked (non-blocking — don't fail the request if this errors)
    await resend.emails.send({
      from: "Greenberg Safety <noreply@greenbergsafety.com>",
      to: email,
      subject: "Your consultation request — Greenberg Safety",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#2a3142">
          <div style="background:#0a1024;padding:24px 32px;border-radius:6px 6px 0 0">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase">
              Greenberg Safety
            </p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px;padding:32px">
            <h2 style="font-size:22px;font-weight:600;color:#0a1024;margin:0 0 12px;letter-spacing:-0.5px">
              We received your request, ${name.split(" ")[0]}.
            </h2>
            <p style="font-size:15px;line-height:1.6;margin:0 0 24px">
              Vitaliy will reach out to confirm your <strong>${date} at ${time} CDT</strong> consultation. If you need to reach us sooner:
            </p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:8px 0;font-size:14px;color:#6b7280;width:80px">Phone</td>
                  <td style="padding:8px 0;font-size:14px"><a href="tel:+15125857070" style="color:#0F4BF3">(512) 585-7070</a></td></tr>
              <tr><td style="padding:8px 0;font-size:14px;color:#6b7280">Email</td>
                  <td style="padding:8px 0;font-size:14px"><a href="mailto:Vitaliy@GreenbergSafety.com" style="color:#0F4BF3">Vitaliy@GreenbergSafety.com</a></td></tr>
            </table>
            <p style="font-size:13px;color:#6b7280;margin:0">Greenberg Safety · Austin, Texas · greenbergsafety.com</p>
          </div>
        </div>
      `,
    }).catch((err: unknown) => console.error("Confirmation email error:", err));

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
