import { Router } from 'express';
import UserRouter from './UserRouter';
import AuthenticationRouter from './AuthenticationRouter';
import UserAddressRouter from './UserAddressRouter';
import AddressTypeRouter from './AddressTypeRouter';
import CartRouter from './CartRouter';
import LanguageRouter from './LanguageRouter';
import ProductController from './ProductRouter';

const router = Router();

router.use('/authenticate', AuthenticationRouter);

router.use('/user', UserRouter);
router.use('/user-address', UserAddressRouter);
router.use('/address-type', AddressTypeRouter);
router.use('/cart', CartRouter);
router.use('/language', LanguageRouter);
router.use('/product', ProductController);

export default router;
