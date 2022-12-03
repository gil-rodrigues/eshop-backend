import Cart from 'datasource/typeorm/entities/Cart';
import ICreateCartDto from 'models/Cart/ICreateCartDto';

interface ICartRepository {
  getCartById(guid: string): Promise<Cart | undefined>;

  getNotPurchasedCartById(guid: string): Promise<Cart | undefined>;

  //   getByEmail(email: string): Promise<User | undefined>;

  getOpenCartByUser(id_user: string): Promise<Cart | undefined>;

  create(data: ICreateCartDto): Promise<Cart>;

  //   update(data: IUpdateUserDto): Promise<User>;
}

export default ICartRepository;
