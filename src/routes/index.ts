import { Router } from 'express';
import UserRouter from './UserRouter';
import AuthenticationRouter from './AuthenticationRouter';
import UserAddressRouter from './UserAddressRouter';
import AddressTypeRouter from './AddressTypeRouter';

const router = Router();

router.use('/authenticate', AuthenticationRouter);

router.use('/user', UserRouter);
router.use('/user-address', UserAddressRouter);
router.use('/address-type', AddressTypeRouter);

export default router;
