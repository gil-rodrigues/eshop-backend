import ICreateCartItemDto from '../models/CartItem/ICreateCartItemDto';
import ICreateCartRequestDto from '../models/Cart/ICreateCartRequestDto';
import Cart from '../datasource/typeorm/entities/Cart';
import HttpInvokerWithAuthentication from './helpers/HttpInvokerWithAuthentication';
import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';

let httpInvokerWithAuthentication: HttpInvokerWithAuthentication;

describe('cart', () => {
  beforeEach(() => {
    httpInvokerWithAuthentication = new HttpInvokerWithAuthentication(
      IntegrationWebInvoker
    );
  });

  it('cart/post', async () => {
    const cartRequestDto = {
      id_user: 'b8926387-a136-48f2-867f-b918df1463bd'
    } as ICreateCartRequestDto;

    const res = await httpInvokerWithAuthentication.post<Cart>(
      '/cart',
      cartRequestDto
    );

    expect(res).toBeInstanceOf(Cart);
  });
});
