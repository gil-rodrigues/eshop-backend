import ICreateCartItemRequestDto from '../models/CartItem/ICreateCartItemRequestDto';
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
    const cartRequestDto = {} as ICreateCartRequestDto;

    const res = await httpInvokerWithAuthentication.post<Cart>(
      '/cart',
      cartRequestDto
    );

    expect(res).toBeInstanceOf(Cart);
  });

  it('cart/item/post', async () => {
    const cartRequestDto = {
      id_cart: '1877b926-5430-4ea1-b2b8-e08bf82372ed',
      id_product: 'fc0a9036-cd19-4bb9-9774-c92dd4b3a0e9',
      quantity: 2
    } as ICreateCartItemRequestDto;

    const res = await httpInvokerWithAuthentication.post<Cart>(
      '/cart/item',
      cartRequestDto
    );

    expect(res).toBeInstanceOf(Cart);
  });

  it('cart/item/delete', async () => {
    const cartItemId = '180c3ff3-bc65-440b-b36e-873cb92bb009';

    const res = await httpInvokerWithAuthentication.delete<Cart>(
      `/cart/item/${cartItemId}`
    );

    expect(res).toBeInstanceOf(Cart);
  });
});
