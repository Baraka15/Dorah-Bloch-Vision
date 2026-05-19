import { Router, type IRouter } from "express";
import { db, admissionsTable, insertAdmissionSchema } from "@workspace/db";
import { desc } from "drizzle-orm";
import { sendAdmissionNotification } from "../lib/email";

const router: IRouter = Router();

router.post("/admissions", async (req, res) => {
  const result = insertAdmissionSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "Invalid submission", details: result.error.issues });
    return;
  }

  try {
    const [admission] = await db
      .insert(admissionsTable)
      .values(result.data)
      .returning();

    req.log.info({ admissionId: admission.id }, "New admission inquiry submitted");

    sendAdmissionNotification({
      studentName: admission.studentName,
      dateOfBirth: admission.dateOfBirth,
      gender: admission.gender,
      previousSchool: admission.previousSchool,
      entryLevel: admission.entryLevel,
      parentName: admission.parentName,
      parentPhone: admission.parentPhone,
      parentEmail: admission.parentEmail,
      residence: admission.residence,
      applyingForBursary: admission.applyingForBursary,
      message: admission.message,
      submissionId: admission.id,
      submittedAt: new Date(admission.createdAt).toLocaleString("en-UG", {
        timeZone: "Africa/Kampala",
        dateStyle: "full",
        timeStyle: "short",
      }),
    }).catch((err) => {
      req.log.error({ err }, "Failed to send admission notification email");
    });

    res.status(201).json({
      success: true,
      id: admission.id,
      message: "Application received successfully",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save admission");
    res.status(500).json({ error: "Failed to submit application. Please try again." });
  }
});

router.get("/admissions", async (req, res) => {
  try {
    const admissions = await db
      .select()
      .from(admissionsTable)
      .orderBy(desc(admissionsTable.createdAt));

    res.json(admissions);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch admissions");
    res.status(500).json({ error: "Failed to fetch admissions" });
  }
});

export default router;
