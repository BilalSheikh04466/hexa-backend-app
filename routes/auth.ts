import express from 'express';
import { logIn, logOut, signUp } from '../controllers/authController';

const router = express.Router();

// Routes
router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

export default router;
