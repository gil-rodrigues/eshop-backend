import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import UserController from 'controllers/UserController';
import CheckAuthentication from 'middlewares/CheckAuthentication';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', CheckAuthentication, userController.show);

userRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        cellphone_number: Joi.string().required()
      }
    },
    {
      abortEarly: false
    }
  ),
  userController.create
);

userRouter.put(
  '/:id',
  CheckAuthentication,
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().guid().required()
      },
      [Segments.BODY]: Joi.object({
        name: Joi.string(),
        cellphone_number: Joi.string(),
        email: Joi.forbidden().label(
          'This route cannot be used to change email!'
        ),
        password: Joi.forbidden().label(
          'This route cannot be used to change password!'
        )
      }).min(1)
    },
    {
      abortEarly: false
    }
  ),
  userController.update
);

userRouter.delete(
  '/:id',
  CheckAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required()
    }
  }),
  userController.inactivate
);

export default userRouter;
