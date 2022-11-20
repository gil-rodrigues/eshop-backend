import Product from 'datasource/typeorm/entities/Product';
import ICreateProductRequestDto from 'models/Product/ICreateProductRequestDto';
import HttpInvokerWithAuthentication from './helpers/HttpInvokerWithAuthentication';
import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';

let httpInvokerWithAuthentication: HttpInvokerWithAuthentication;

describe('product', () => {
  beforeEach(() => {
    httpInvokerWithAuthentication = new HttpInvokerWithAuthentication(
      IntegrationWebInvoker
    );
  });

  it('product/post', async () => {
    const price = 100;
    const discount_price = 100;
    const productDesignationList = [
      {
        code_lang: 'pt_PT',
        description: 'Laca de cabelo Stillo'
      },
      {
        code_lang: 'en_US',
        description: 'Hairspray Stillo'
      }
    ];

    const res = await httpInvokerWithAuthentication.post<Product>('/product', {
      price,
      discount_price,
      productDesignationList
    } as ICreateProductRequestDto);

    expect(res.data).toHaveProperty('id');
  });
});
