import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { registerUserSchema } from './user.schema';
import requireUser from '../../middleware/requireUser';
import registerHandler from './user.controller';

const router = express.Router();

router.get('/', requireUser, (req: Request, res: Response) => {
  res.send(res.locals.user);
});

router.post('/', processRequestBody(registerUserSchema.body), registerHandler);

export default router;
