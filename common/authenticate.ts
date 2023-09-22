import { NextFunction, Request, Response } from 'express';
import { VerifyErrors, verify } from 'jsonwebtoken';
import { logger } from './logger';

import { User } from '../models';

interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (token && process.env.JWT_SECRET_KEY) {
    verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (err: VerifyErrors | null, decodedToken: any) => {
        if (err || !decodedToken) {
          logger.error('Token not verified', err);
          return res
            .status(401)
            .json({ message: 'Not authorized - token verification failed.' });
        }
        const user = await User.findByPk(decodedToken.id);
        if (!user) {
          req.user = undefined;
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          req.user = user;
          logger.info('Request user', req.user);
          next();
        }
      }
    );
  } else {
    return res
      .status(401)
      .json({ message: 'Cannot authorize, token or jwt secret missing' });
  }
};
