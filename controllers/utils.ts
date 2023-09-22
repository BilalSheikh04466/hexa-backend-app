import { sign } from 'jsonwebtoken';

export const generateJWToken = (payload: object) => {
  if (process.env.JWT_SECRET_KEY) {
    return sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60,
    });
  }
};
