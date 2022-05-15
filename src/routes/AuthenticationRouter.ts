import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import AuthenticationController from 'controllers/AuthenticationController';

const authenticationRouter = Router();
const authenticationController = new AuthenticationController();

authenticationRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    {
      abortEarly: false
    }
  ),
  authenticationController.create
);

export default authenticationRouter;
