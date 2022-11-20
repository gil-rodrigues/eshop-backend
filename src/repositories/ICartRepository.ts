import Cart from 'datasource/typeorm/entities/Cart';
import ICreateCartDto from 'models/Cart/ICreateCartDto';

interface ICartRepository {
  //   getAll(includeInactive?: boolean): Promise<User[]>;

  //   getById(guid: string): Promise<User | undefined>;

  //   getByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateCartDto): Promise<Cart>;

  //   update(data: IUpdateUserDto): Promise<User>;
}

export default ICartRepository;
