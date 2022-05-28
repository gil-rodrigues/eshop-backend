import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import CheckAuthentication from 'middlewares/CheckAuthentication';
import AddressTypeController from 'controllers/AddressTypeController';

const addressTypeRouter = Router();
const addressTypeController = new AddressTypeController();

addressTypeRouter.get(
  '/:code',
  CheckAuthentication,
  addressTypeController.show
);

addressTypeRouter.post(
  '/',
  CheckAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        code: Joi.string().required(),
        description: Joi.string().required()
      }
    },
    {
      abortEarly: false
    }
  ),
  addressTypeController.create
);

addressTypeRouter.delete(
  '/:code',
  CheckAuthentication,
  addressTypeController.inactivate
);

export default addressTypeRouter;
