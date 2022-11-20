import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { JsonWebTokenError } from 'jsonwebtoken';
import CartItemServices from 'services/CartItemServices';

class CartItemController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_product, quantity } = req.body;

    const cartItemService = container.resolve(CartItemServices);

    const cart = await cartItemService.addItemToCart({
      id_product,
      quantity
    });

    return res.json(cart);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'OK' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'OK' });
  }
}

export default CartItemController;
