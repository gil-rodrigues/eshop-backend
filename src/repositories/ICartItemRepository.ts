import Cart from 'datasource/typeorm/entities/Cart';
import ICreateCartItemDto from 'models/CartItem/ICreateCartItemDto';

interface ICartItemRepository {
  create(data: ICreateCartItemDto): Promise<Cart>;
}

export default ICartItemRepository;
