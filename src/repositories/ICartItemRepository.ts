import CartItem from 'datasource/typeorm/entities/CartItem';
import ICreateCartItemDto from 'models/CartItem/ICreateCartItemDto';
import IUpdateCartItemDto from 'models/CartItem/IUpdateCartItemDto';

interface ICartItemRepository {
  create(data: ICreateCartItemDto): Promise<CartItem>;
  update(data: IUpdateCartItemDto): Promise<CartItem>;
}

export default ICartItemRepository;
