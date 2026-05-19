import nodemailer from "nodemailer";
import { logger } from "./logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env["SMTP_EMAIL"],
    pass: process.env["SMTP_APP_PASSWORD"],
  },
});

export type AdmissionEmailData = {
  studentName: string;
  dateOfBirth: string;
  gender: string;
  previousSchool: string;
  entryLevel: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  residence: string;
  applyingForBursary: string;
  message?: string | null;
  submissionId: number;
  submittedAt: string;
};

export async function sendAdmissionNotification(data: AdmissionEmailData): Promise<void> {
  const adminEmail = process.env["ADMIN_EMAIL"];

  if (!adminEmail || !process.env["SMTP_EMAIL"] || !process.env["SMTP_APP_PASSWORD"]) {
    logger.warn("Email credentials not configured — skipping notification");
    return;
  }

  const bursaryText = data.applyingForBursary === "yes"
    ? "YES — Requesting financial support"
    : "No — Paying full fees";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.10); }
    .header { background: #1a3a5c; padding: 32px 40px; text-align: center; }
    .header img { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; }
    .header h1 { color: #C9A227; font-size: 22px; margin: 12px 0 4px; letter-spacing: 1px; }
    .header p { color: #a0b4c8; font-size: 13px; margin: 0; letter-spacing: 2px; text-transform: uppercase; }
    .alert-bar { background: #C9A227; color: #1a3a5c; text-align: center; padding: 10px 40px; font-size: 14px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
    .body { padding: 36px 40px; }
    .section-title { font-size: 11px; font-weight: bold; color: #1a3a5c; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #C9A227; padding-bottom: 6px; margin: 28px 0 16px; }
    .field { display: flex; margin-bottom: 12px; }
    .field-label { width: 180px; font-size: 13px; color: #6b7c93; flex-shrink: 0; }
    .field-value { font-size: 13px; color: #1a3a5c; font-weight: 600; }
    .bursary-yes { color: #c0392b; }
    .bursary-no { color: #27ae60; }
    .message-box { background: #f4f6f9; border-left: 3px solid #C9A227; padding: 14px 16px; font-size: 13px; color: #444; border-radius: 0 4px 4px 0; margin-top: 8px; }
    .footer { background: #f4f6f9; padding: 20px 40px; text-align: center; border-top: 1px solid #e0e7ef; }
    .footer p { font-size: 12px; color: #999; margin: 4px 0; }
    .ref { display: inline-block; background: #1a3a5c; color: #C9A227; font-size: 12px; padding: 4px 12px; border-radius: 20px; margin-top: 6px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>DORAH BLOCH INTERNATIONAL COLLEGE</h1>
      <p>New Admission Application</p>
    </div>
    <div class="alert-bar">New Student Application Received</div>
    <div class="body">
      <p style="color:#444;font-size:14px;margin:0 0 4px;">
        A new admission application has been submitted through the school website. Please review the details below and follow up with the parent/guardian within 48 hours.
      </p>

      <div class="section-title">Student Information</div>
      <div class="field"><span class="field-label">Full Name</span><span class="field-value">${data.studentName}</span></div>
      <div class="field"><span class="field-label">Date of Birth</span><span class="field-value">${data.dateOfBirth}</span></div>
      <div class="field"><span class="field-label">Gender</span><span class="field-value">${data.gender}</span></div>
      <div class="field"><span class="field-label">Previous School</span><span class="field-value">${data.previousSchool}</span></div>
      <div class="field"><span class="field-label">Entry Level</span><span class="field-value">${data.entryLevel}</span></div>
      <div class="field"><span class="field-label">District / Residence</span><span class="field-value">${data.residence}</span></div>
      <div class="field"><span class="field-label">Bursary Application</span><span class="field-value ${data.applyingForBursary === "yes" ? "bursary-yes" : "bursary-no"}">${bursaryText}</span></div>

      <div class="section-title">Parent / Guardian Information</div>
      <div class="field"><span class="field-label">Name</span><span class="field-value">${data.parentName}</span></div>
      <div class="field"><span class="field-label">Phone</span><span class="field-value">${data.parentPhone}</span></div>
      <div class="field"><span class="field-label">Email</span><span class="field-value">${data.parentEmail || "Not provided"}</span></div>

      ${data.message ? `
      <div class="section-title">Additional Message from Parent</div>
      <div class="message-box">${data.message}</div>
      ` : ""}

      <div class="section-title">Submission Details</div>
      <div class="field"><span class="field-label">Application ID</span><span class="field-value">#${data.submissionId}</span></div>
      <div class="field"><span class="field-label">Submitted At</span><span class="field-value">${data.submittedAt}</span></div>
    </div>
    <div class="footer">
      <p>This notification was sent automatically from the Dorah Bloch International College website.</p>
      <p>Bweyale Town Council, Kiryandongo District, Uganda &nbsp;|&nbsp; +256 772 427 251</p>
      <span class="ref">Ref: DBIC-ADM-${String(data.submissionId).padStart(4, "0")}</span>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plain = `
NEW ADMISSION APPLICATION — DORAH BLOCH INTERNATIONAL COLLEGE
Application ID: #${data.submissionId} | Ref: DBIC-ADM-${String(data.submissionId).padStart(4, "0")}
Submitted: ${data.submittedAt}

STUDENT DETAILS
  Name:            ${data.studentName}
  Date of Birth:   ${data.dateOfBirth}
  Gender:          ${data.gender}
  Previous School: ${data.previousSchool}
  Entry Level:     ${data.entryLevel}
  Residence:       ${data.residence}
  Bursary:         ${bursaryText}

PARENT / GUARDIAN
  Name:  ${data.parentName}
  Phone: ${data.parentPhone}
  Email: ${data.parentEmail || "Not provided"}

${data.message ? `MESSAGE FROM PARENT\n  ${data.message}\n` : ""}
---
Dorah Bloch International College | Bweyale, Kiryandongo District, Uganda | +256 772 427 251
  `.trim();

  await transporter.sendMail({
    from: `"Dorah Bloch College Website" <${process.env["SMTP_EMAIL"]}>`,
    to: adminEmail,
    subject: `New Admission Application — ${data.studentName} (${data.entryLevel}) [DBIC-ADM-${String(data.submissionId).padStart(4, "0")}]`,
    text: plain,
    html,
  });

  logger.info({ admissionId: data.submissionId, to: adminEmail }, "Admission notification email sent");
}
