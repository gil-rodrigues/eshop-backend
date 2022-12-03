import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CartServices from 'services/CartServices';

class CartController {
  public async create(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;
    const { id_user_address } = req.body;

    const cartServices = container.resolve(CartServices);

    const cart = await cartServices.createCart({
      id_user,
      id_user_address
    });

    return res.json(cart);
  }
}

export default CartController;
