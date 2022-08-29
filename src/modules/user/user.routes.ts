import express, { Request, Response } from "express";
import { processRequestBody } from "zod-express-middleware";
import requireUser from "../../middleware/requireUser";
import { registerHandler } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = express.Router();

router.get("/", requireUser, (req: Request, res: Response) => {
  res.send(res.locals.user);
});

router.post("/", processRequestBody(registerUserSchema.body), registerHandler);

export default router;
