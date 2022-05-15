import { Router } from 'express';
import UserRouter from './UserRouter';
import AuthenticationRouter from './AuthenticationRouter';

const router = Router();

router.use('/user', UserRouter);
router.use('/authenticate', AuthenticationRouter);

export default router;
