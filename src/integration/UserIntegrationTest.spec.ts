import axios, { AxiosError } from 'axios';
import User from '../datasource/typeorm/entities/User';
import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';
import HttpInvokerWithAuthentication from './helpers/HttpInvokerWithAuthentication';

let httpInvokerWithAuthentication: HttpInvokerWithAuthentication;

describe('user', () => {
  beforeEach(() => {
    httpInvokerWithAuthentication = new HttpInvokerWithAuthentication(
      IntegrationWebInvoker
    );
  });

  it('user/get', async () => {
    const res = await httpInvokerWithAuthentication.get<User[]>('/user');

    expect(res.data).toBeInstanceOf(Array);

    if (res.data.length > 0) expect(res.data[0].id !== undefined).toBe(true);
  });

  it('user/post', async () => {
    const userToAdd = new User();

    userToAdd.name = 'Gil Rodrigues';
    userToAdd.cellphone_number = '961823800';
    userToAdd.email = 'gil.rodrigues@ozono.pt';
    userToAdd.password = 'password';

    const res = await IntegrationWebInvoker.post<User>('/user', userToAdd);

    expect(res.data).toHaveProperty('id');
  });

  it('user/put', async () => {
    const userToUpdate = new User();

    // Can be changed
    const userName = 'Michelle Macedo2';
    const cellPhoneNumber = '913729784';

    userToUpdate.name = userName;
    userToUpdate.cellphone_number = cellPhoneNumber;

    try {
      const res = await httpInvokerWithAuthentication.put<User>(
        `/user/`,
        userToUpdate
      );

      expect(res.data).toHaveProperty('id');
      expect(res.data.name).toEqual(userName);
      expect(res.data.cellphone_number).toEqual(cellPhoneNumber);
    } catch (ex) {
      const err = ex as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        // eslint-disable-next-line no-console
        console.log(err.response?.data);
      }

      expect(0).toEqual(1);
    }
  });

  it('user/delete', async () => {
    const res = await httpInvokerWithAuthentication.delete<User>(`/user/`);

    expect(res.status).toBe(204);
  });
});
