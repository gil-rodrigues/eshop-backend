import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import LanguageController from 'controllers/LanguageController';

const languageRouter = Router();
const languageController = new LanguageController();

languageRouter.get('/:code', languageController.show);

languageRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required()
    }
  }),
  languageController.create
);

export default languageRouter;
