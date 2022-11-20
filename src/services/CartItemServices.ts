import ICartItemRepository from 'repositories/ICartItemRepository';
import ICartRepository from 'repositories/ICartRepository';
import Cart from 'datasource/typeorm/entities/Cart';
import CartItem from 'datasource/typeorm/entities/CartItem';
import IAddItemToCartRequestDto from 'models/Cart/IAddItemToCartDto';
import { inject, injectable } from 'tsyringe';

@injectable()
class CartItemServices {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,

    @inject('CartItemRepository')
    private cartItemRepository: ICartItemRepository
  ) {}

  public async addItemToCart({
    id_product,
    quantity
  }: IAddItemToCartRequestDto): Promise<Cart> {
    // validar stock

    // verificar preco

    const cart = await this.cartItemRepository.create({
      id_cart: 'aksjdh',
      id_product,
      quantity,
      price: 0,
      final_price: 0
    });

    return cart;
  }
}

export default CartItemServices;
