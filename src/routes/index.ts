import { Router, Request, Response } from 'express';
import UsersRouter from './UsersRouter';

const router = Router();

router.use('/user', UsersRouter);

export default router;
