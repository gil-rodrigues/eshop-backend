import { AxiosError } from 'axios';
import UserAddress from '../datasource/typeorm/entities/UserAddress';
import User from '../datasource/typeorm/entities/User';
import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';
import HttpInvokerWithAuthentication from './helpers/HttpInvokerWithAuthentication';

let httpInvokerWithAuthentication: HttpInvokerWithAuthentication;

describe('user-address', () => {
  beforeEach(() => {
    httpInvokerWithAuthentication = new HttpInvokerWithAuthentication(
      IntegrationWebInvoker
    );
  });

  it('user-address/get', async () => {
    const id_user = '99ff8c2d-602c-4a20-a2d1-058b22ded4b6';

    const res = await httpInvokerWithAuthentication.get<User[]>(
      `/user-address/${id_user}`
    );

    expect(res.data).toBeInstanceOf(Array);
    if (res.data.length > 0) expect(res.data[0]).toHaveProperty('id');
  });

  it('user-address/post', async () => {
    const addressTypeCode = 'BILLING';
    const userId = '99ff8c2d-602c-4a20-a2d1-058b22ded4b6';

    const userAddress = new UserAddress();

    userAddress.name = 'Casa de Lisboa2';
    userAddress.address = 'Largo Antonio Aleixo, no 9, 3 esq';
    userAddress.postal_code = '2675-227';
    userAddress.local = 'Odivelas';
    userAddress.region = 'Lisboa';
    userAddress.country = 'Portugal';

    const res = await httpInvokerWithAuthentication.post<UserAddress>(
      `/user-address/${userId}/${addressTypeCode}`,
      userAddress
    );

    expect(res.data).toHaveProperty('id');
  });

  it('user-address/put', async () => {
    const userAddressToUpdate = '2447b0c2-ad36-4ab2-b0cf-0304b3cc440f';

    const userAddress = new UserAddress();

    userAddress.name = 'Casa de Lisboa3';
    userAddress.address = 'Largo Antonio Aleixo, no 9, 3 esq';
    userAddress.postal_code = '2675-228';
    userAddress.local = 'Odivelas';
    userAddress.region = 'Lisboa';
    userAddress.country = 'Portugal';

    try {
      const res = await httpInvokerWithAuthentication.put<UserAddress>(
        `/user-address/${userAddressToUpdate}`,
        userAddress
      );

      expect(res.data).toHaveProperty('id');
    } catch (err) {
      console.log(err);

      throw err;
    }
  });

  it('user-address/delete', async () => {
    const userAddressIdToDelete = '2447b0c2-ad36-4ab2-b0cf-0304b3cc440f';

    const res = await httpInvokerWithAuthentication.delete<User>(
      `/user-address/${userAddressIdToDelete}`
    );

    expect(res.status).toBe(204);
  });
});
