import CartItem from 'datasource/typeorm/entities/CartItem';
import ICreateCartItemRequestDto from './ICreateCartItemRequestDto';

interface IInternalUpdateCartItemDto {
  newItemRequest: ICreateCartItemRequestDto;
  oldItem: CartItem;
}

export default IInternalUpdateCartItemDto;
