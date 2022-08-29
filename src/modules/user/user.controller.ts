import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export const registerHandler = async (
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) => {
  const { username, email, password } = req.body;
  try {
    await createUser({ username, email, password });
    return res.status(StatusCodes.CREATED).send("User created successfully.");
  } catch (error) {
    return error.code === 11000
      ? res.status(StatusCodes.CONFLICT).send("User already exists.")
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
