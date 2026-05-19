import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.get("/admissions/test-email", async (req, res) => {
  const smtpEmail = process.env["SMTP_EMAIL"]?.trim();
  const smtpPass = process.env["SMTP_APP_PASSWORD"]?.trim().replace(/\s+/g, "");
  const adminEmail = process.env["ADMIN_EMAIL"]?.trim();

  if (!smtpEmail || !smtpPass || !adminEmail) {
    res.status(500).json({
      ok: false,
      error: "Missing credentials",
      smtpEmailSet: !!smtpEmail,
      smtpPassSet: !!smtpPass,
      adminEmailSet: !!adminEmail,
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: smtpEmail, pass: smtpPass },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: `"Dorah Bloch College Website" <${smtpEmail}>`,
      to: adminEmail,
      subject: "Test Email — Dorah Bloch College Website",
      text: "This is a test email confirming your email notifications are working correctly for the Dorah Bloch International College website.",
    });
    req.log.info({ to: adminEmail }, "Test email sent successfully");
    res.json({ ok: true, message: `Test email sent to ${adminEmail}` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    req.log.error({ err }, "Test email failed");
    res.status(500).json({ ok: false, error: message });
  }
});

export default router;
