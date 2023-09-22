import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { logger } from '../common';
import { User } from '../models';
import { CreateUserPayload, LoginResponse, SignUpResponse } from '../types';
import { generateJWToken } from './utils';

export const signUp = async (
  req: Request,
  res: Response
): Promise<SignUpResponse | any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res
        .status(400)
        .json({ message: 'Required fields missing for sign up.' });

    const userData: CreateUserPayload = {
      firstName,
      lastName,
      email,
      password: await hash(password, 10),
    };

    const user = await User.create(userData);
    logger.info(`New user created with email: ${email}`);

    const token = generateJWToken({ id: user.id });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    const result: SignUpResponse = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
    logger.info('User signed up successfully!');
    return res.status(200).json(result);
  } catch (error) {
    logger.error('User sign up failed.', error);
    return res
      .status(400)
      .json({ message: `User sign up failed due to error: ${error}` });
  }
};

export const logIn = async (
  req: Request,
  res: Response
): Promise<SignUpResponse | any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: `User doesn't exist for ${email}` });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid email or password' });
    }

    const token = generateJWToken({ id: user.id });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    const result: LoginResponse = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
    logger.info('User logged in successfully!');
    return res.status(200).json(result);
  } catch (error) {
    logger.error('User sign in failed.', error);
    return res
      .status(400)
      .json({ message: `User sign in failed due to error: ${error}` });
  }
};

export const logOut = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cookies = req.cookies;

  if (cookies.jwt) {
    res.clearCookie('jwt', { httpOnly: true });
  }
  return res.status(204).json({});
};
