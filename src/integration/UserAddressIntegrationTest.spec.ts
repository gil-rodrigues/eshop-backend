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

    userAddress.name = 'Casa de Lisboa';
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

  // it('user/put', async () => {
  //   const userToUpdate = new User();

  //   // Can be changed
  //   const userId = 'e1c2eda9-6b6b-43f0-a28b-1ba12a1115d6';
  //   const userName = 'Michelle Macedo2';
  //   const cellPhoneNumber = '913729784';

  //   userToUpdate.name = userName;
  //   userToUpdate.cellphone_number = cellPhoneNumber;

  //   try {
  //     const res = await httpInvokerWithAuthentication.put<User>(
  //       `/user/${userId}`,
  //       userToUpdate
  //     );

  //     expect(res.data).toHaveProperty('id');
  //     expect(res.data.name).toEqual(userName);
  //     expect(res.data.cellphone_number).toEqual(cellPhoneNumber);
  //   } catch (ex) {
  //     const err = ex as Error | AxiosError;
  //     if (axios.isAxiosError(err)) {
  //       // eslint-disable-next-line no-console
  //       console.log(err.response?.data);
  //     }

  //     expect(0).toEqual(1);
  //   }
  // });

  // it('user/delete', async () => {
  //   const userIdToDelete = 'b75130a4-7204-4b4f-9960-28a8c7fa5c6c';

  //   const res = await httpInvokerWithAuthentication.delete<User>(
  //     `/user/${userIdToDelete}`
  //   );

  //   expect(res.status).toBe(204);
  // });
});
