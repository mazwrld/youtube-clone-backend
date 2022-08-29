import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../modules/auth/auth.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer's/, "");

  if (!accessToken) {
    return next();
  }

  if (verifyJwt(accessToken)) {
    res.locals.user = verifyJwt(accessToken);
  }

  return next();
}

export default deserializeUser;
