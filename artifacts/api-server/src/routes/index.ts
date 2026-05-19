import { Router, type IRouter } from "express";
import healthRouter from "./health";
import admissionsRouter from "./admissions";
import emailTestRouter from "./email-test";

const router: IRouter = Router();

router.use(healthRouter);
router.use(admissionsRouter);
router.use(emailTestRouter);

export default router;
