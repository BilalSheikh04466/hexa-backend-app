import express from 'express';
import { authenticate } from '../common';
import authRouter from './auth';
import userRouter from './users';

const apiRouter = express.Router();

// routes
apiRouter.use('/', authRouter);
apiRouter.use('/users', authenticate, userRouter);

export { apiRouter };
