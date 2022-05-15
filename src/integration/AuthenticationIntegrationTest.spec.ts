import User from 'datasource/typeorm/entities/User';
import IAuthenticationRequestDto from 'models/Authentication/IAuthenticationRequestDto';
import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';

describe('authentication', () => {
  it('authentication/post', async () => {
    const authenticationRequest = {
      email: 'gil.rodrigues@ozono.pt',
      password: 'abcdef'
    } as IAuthenticationRequestDto;

    const res = await IntegrationWebInvoker.post<User>(
      '/authenticate',
      authenticationRequest
    );

    expect(res.data).toHaveProperty('token');
    expect(res.data).toHaveProperty('user');
  });
});
