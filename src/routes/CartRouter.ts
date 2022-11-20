import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import CartController from 'controllers/CartController';
import CheckAuthentication from 'middlewares/CheckAuthentication';
import CartItemController from 'controllers/CartItemController';

const cartRouter = Router();
const cartController = new CartController();
const cartItemController = new CartItemController();

cartRouter.post(
  '/',
  CheckAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        id_user: Joi.string().guid().required(),
        id_user_address: Joi.string().guid()
      }
    },
    {
      abortEarly: false
    }
  ),
  cartController.create
);

cartRouter.post('/item', CheckAuthentication, cartItemController.create);

cartRouter.put(
  '/item/:cartItemId',
  CheckAuthentication,
  cartItemController.update
);

cartRouter.delete(
  '/item/:cartItemId',
  CheckAuthentication,
  cartItemController.delete
);

export default cartRouter;
