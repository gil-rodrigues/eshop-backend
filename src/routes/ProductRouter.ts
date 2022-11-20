import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ProductController from 'controllers/ProductController';

// import LanguageController from 'controllers/LanguageController';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/:code', productController.show);

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      price: Joi.number().required(),
      discount_price: Joi.number().required(),
      productDesignationList: Joi.array()
    }
  }),
  productController.create
);

// todo - update and delete methods not yet implemented
productRouter.put(
  '/:code',
  // celebrate({
  //   [Segments.BODY]: {
  //     price: Joi.number().required(),
  //     discount_price: Joi.number().required(),
  //     productDesignationList: Joi.array()
  //   }
  // }),
  productController.update
);

productRouter.delete('/:code', productController.inactivate);

export default productRouter;
