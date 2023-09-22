import express from 'express';
import { getAllUsers } from '../controllers/userController';

const router = express.Router();

// Routes
router.get('/', getAllUsers);

export default router;
