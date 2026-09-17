import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0c; color: #f4f3ef; padding: 40px; border-radius: 8px;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #d4a359; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
            Fillablank Studio ✦ New Strategic Inquiry
          </h1>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #8e8e93; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px;">Client / Sender</p>
          <p style="font-size: 18px; font-weight: 600; margin: 0; color: #ffffff;">${name}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="color: #8e8e93; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px;">Direct Email</p>
          <p style="font-size: 16px; margin: 0;"><a href="mailto:${email}" style="color: #d4a359; text-decoration: none;">${email}</a></p>
        </div>

        <div style="margin-bottom: 30px; padding: 20px; background: #141417; border-left: 3px solid #d4a359; border-radius: 4px;">
          <p style="color: #8e8e93; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px;">Project Brief & Technical Targets</p>
          <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #f4f3ef; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 12px; color: #8e8e93;">
          <p style="margin: 0;">Dispatched directly from fillablank.com contact interface.</p>
        </div>
      </div>
    `;

    // 1. Primary delivery: Resend REST API if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Fillablank Website <hello@fillablank.com>',
          to: ['hello@fillablank.com'],
          reply_to: email,
          subject: `New Strategic Inquiry: ${name}`,
          html: htmlContent,
        }),
      });

      const resendData = await resendRes.json();

      if (!resendRes.ok) {
        console.error('Resend delivery error:', resendData);
        throw new Error(resendData.message || 'Failed to dispatch email via Resend.');
      }

      return NextResponse.json({ success: true, id: resendData.id });
    }

    // 2. Fallback delivery: Nodemailer (SMTP / Gmail App Password if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: 'hello@fillablank.com',
        replyTo: email,
        subject: `New Strategic Inquiry: ${name}`,
        html: htmlContent,
      });

      return NextResponse.json({ success: true, method: 'smtp' });
    }

    return NextResponse.json(
      { error: 'Email service is not configured. Please add RESEND_API_KEY in .env.local.' },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error('Contact API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
