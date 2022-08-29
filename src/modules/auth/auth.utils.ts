import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const EXPIRES_IN = "7d";

export function signJwt(payload: string | Buffer | object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

export function verifyJwt(token: string) {
  let result: any;

  try {
    result = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    result = null;
  }

  return result;
}
