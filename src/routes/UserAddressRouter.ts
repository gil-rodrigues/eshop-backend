import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import CheckAuthentication from 'middlewares/CheckAuthentication';
import UserAddressController from 'controllers/UserAddressController';

const userAddressRouter = Router();
const userAddressController = new UserAddressController();

userAddressRouter.get(
  '/:id_user',
  CheckAuthentication,
  userAddressController.index
);

userAddressRouter.post(
  '/:id_user/:address_type',
  CheckAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        address: Joi.string().required(),
        local: Joi.string().required(),
        postal_code: Joi.string().required(),
        region: Joi.string().required(),
        // Todo - improve country
        country: Joi.string().required()
      }
    },
    {
      abortEarly: false
    }
  ),
  userAddressController.create
);

userAddressRouter.put(
  '/:id_address',
  CheckAuthentication,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string(),
        address: Joi.string(),
        local: Joi.string(),
        postal_code: Joi.string(),
        region: Joi.string(),
        // Todo - improve country
        country: Joi.string()
      }
    },
    {
      abortEarly: false
    }
  ),
  userAddressController.update
);

userAddressRouter.delete(
  '/:id',
  CheckAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required()
    }
  }),
  userAddressController.inactivate
);

export default userAddressRouter;
