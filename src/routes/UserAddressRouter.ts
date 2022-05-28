import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import CheckAuthentication from 'middlewares/CheckAuthentication';
import UserAddressController from 'controllers/UserAddressController';

const userAddressRouter = Router();
const userAddressController = new UserAddressController();

userAddressRouter.get(
  '/:id_user',
  CheckAuthentication,
  userAddressController.show
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

// userAddressRouter.put(
//   '/:id',
//   CheckAuthentication,
//   // celebrate(
//   //   {
//   //     [Segments.PARAMS]: {
//   //       id: Joi.string().guid().required()
//   //     },
//   //     [Segments.BODY]: Joi.object({
//   //       name: Joi.string(),
//   //       cellphone_number: Joi.string(),
//   //       email: Joi.forbidden().label(
//   //         'This route cannot be used to change email!'
//   //       ),
//   //       password: Joi.forbidden().label(
//   //         'This route cannot be used to change password!'
//   //       )
//   //     }).min(1)
//   //   },
//   //   {
//   //     abortEarly: false
//   //   }
//   // ),
//   userAddressController.update
// );

// userAddressRouter.delete(
//   '/:id',
//   CheckAuthentication,
//   // celebrate({
//   //   [Segments.PARAMS]: {
//   //     id: Joi.string().guid().required()
//   //   }
//   // }),
//   userAddressController.inactivate
// );

export default userAddressRouter;
