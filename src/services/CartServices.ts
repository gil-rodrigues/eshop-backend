import Cart from 'datasource/typeorm/entities/Cart';
import ICreateCartRequestDto from 'models/Cart/ICreateCartRequestDto';
import ICartRepository from 'repositories/ICartRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CartServices {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  public async createCart({
    id_user,
    id_user_address
  }: ICreateCartRequestDto): Promise<Cart> {
    const cart = await this.cartRepository.create({
      id_user,
      id_user_address
    });

    return cart;
  }
}

export default CartServices;
