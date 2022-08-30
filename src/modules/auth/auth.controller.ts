import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginBody } from './auth.schema';
import { findUserByEmail } from '../user/user.service';
import { signJwt } from './auth.utils';
import Omit from '../../helpers/omit';

const loginHandler = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials.');
  }

  const payload = Omit(user.toJSON(), ['password', '__v']);

  const jwt = signJwt(payload);

  res.cookie('accessToken', jwt, {
    maxAge: 3.154e10,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
};

export default loginHandler;
