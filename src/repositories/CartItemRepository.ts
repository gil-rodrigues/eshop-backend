import CartItem from 'datasource/typeorm/entities/CartItem';
import ICreateCartItemDto from 'models/CartItem/ICreateCartItemDto';
import IUpdateCartItemDto from 'models/CartItem/IUpdateCartItemDto';
import { getRepository, Repository } from 'typeorm';
import ICartItemRepository from './ICartItemRepository';

class CartItemRepository implements ICartItemRepository {
  private ormRepository: Repository<CartItem>;

  constructor() {
    this.ormRepository = getRepository(CartItem);
  }

  public async create(data: ICreateCartItemDto): Promise<CartItem> {
    const cartItem = this.ormRepository.create(data);

    await this.ormRepository.save(cartItem);

    return cartItem;
  }

  public async update(data: IUpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.ormRepository.save(data);

    return cartItem;
  }
}

export default CartItemRepository;
