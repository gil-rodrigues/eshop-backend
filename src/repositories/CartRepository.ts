import { getRepository, Repository } from 'typeorm';

import ICartRepository from 'repositories/ICartRepository';
import ICreateCartDto from 'models/Cart/ICreateCartDto';
import Cart from 'datasource/typeorm/entities/Cart';

class CartRepository implements ICartRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  public async getCartById(id_cart: string): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: {
        id: id_cart
      }
    });

    return cart;
  }

  public async getNotPurchasedCartById(
    id_cart: string
  ): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: {
        id: id_cart,
        purchased: false
      }
    });

    return cart;
  }

  public async getOpenCartByUser(id_user: string): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: {
        id_user,
        purchased: false
      }
    });

    return cart;
  }

  public async create(data: ICreateCartDto): Promise<Cart> {
    const cart = await this.ormRepository.create(data);

    await this.ormRepository.save(cart);

    return cart;
  }
}

export default CartRepository;
