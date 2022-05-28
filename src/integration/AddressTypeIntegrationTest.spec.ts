import AddressType from '../datasource/typeorm/entities/AddressType';
import HttpInvokerWithAuthentication from './helpers/HttpInvokerWithAuthentication';

import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';

let httpInvokerWithAuthentication: HttpInvokerWithAuthentication;

describe('address-type', () => {
  beforeEach(() => {
    httpInvokerWithAuthentication = new HttpInvokerWithAuthentication(
      IntegrationWebInvoker
    );
  });
  it('address-type/get', async () => {
    const addressTypeCode = 'BILLING';

    const res = await httpInvokerWithAuthentication.get<AddressType>(
      `/address-type/${addressTypeCode}`
    );

    expect(res.data).toHaveProperty('id');
  });
  it('address-type/post', async () => {
    const addressType = new AddressType();
    addressType.code = 'SHIPPING';
    addressType.description = 'Shipping Address';

    const res = await httpInvokerWithAuthentication.post<AddressType>(
      '/address-type',
      addressType
    );

    expect(res.data).toHaveProperty('id');
  });

  it('address-type/delete', async () => {
    const addressTypeCode = 'BILLING';

    const res = await httpInvokerWithAuthentication.delete(
      `/address-type/${addressTypeCode}`
    );

    expect(res.status).toBe(204);
  });
});
