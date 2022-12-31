import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CartItemServices from 'services/CartItemServices';

class CartItemController {
  public async create(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;
    const { id_cart, id_product, quantity, price, final_price } = req.body;

    const cartItemService = container.resolve(CartItemServices);

    const cart = await cartItemService.addItemToCart(id_user, {
      id_cart,
      id_product,
      quantity,
      price,
      final_price
    });

    return res.json(cart);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'OK' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cartItemId } = req.params;

    const cartItemService = container.resolve(CartItemServices);

    await cartItemService.deleteCartItem(cartItemId);

    return res.status(204).json();
  }
}

export default CartItemController;
