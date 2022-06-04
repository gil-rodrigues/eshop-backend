import { AxiosInstance, AxiosResponse } from 'axios';
import IAuthenticationResponseDto from 'models/Authentication/IAuthenticationResponseDto';

class HttpInvokerWithAuthentication {
  webInvoker: AxiosInstance;

  constructor(webInvoker: AxiosInstance) {
    this.webInvoker = webInvoker;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async get<T>(route: string): Promise<AxiosResponse<T, any>> {
    // call authentication method
    const invokerResponse =
      await this.webInvoker.post<IAuthenticationResponseDto>('/authenticate', {
        email: process.env.TEST_USER_NAME,
        password: process.env.TEST_USER_PASSWORD
      });
    const { token } = invokerResponse.data;

    this.webInvoker.defaults.headers.common.Authorization = `Bearer ${token}`;

    return this.webInvoker.get<T>(route);
  }

  public async post<T>(
    route: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse<T, any>> {
    // call authentication method
    const invokerResponse =
      await this.webInvoker.post<IAuthenticationResponseDto>('/authenticate', {
        email: process.env.TEST_USER_NAME,
        password: process.env.TEST_USER_PASSWORD
      });

    const { token } = invokerResponse.data;

    this.webInvoker.defaults.headers.common.Authorization = `Bearer ${token}`;

    return this.webInvoker.post<T>(route, data);
  }

  public async put<T>(
    route: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse<T, any>> {
    // call authentication method
    const invokerResponse =
      await this.webInvoker.post<IAuthenticationResponseDto>('/authenticate', {
        email: process.env.TEST_USER_NAME,
        password: process.env.TEST_USER_PASSWORD
      });

    const { token } = invokerResponse.data;

    this.webInvoker.defaults.headers.common.Authorization = `Bearer ${token}`;

    return this.webInvoker.put<T>(route, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async delete<T>(route: string): Promise<AxiosResponse<T, any>> {
    // call authentication method
    const invokerResponse =
      await this.webInvoker.post<IAuthenticationResponseDto>('/authenticate', {
        email: process.env.TEST_USER_NAME,
        password: process.env.TEST_USER_PASSWORD
      });

    const { token } = invokerResponse.data;

    this.webInvoker.defaults.headers.common.Authorization = `Bearer ${token}`;

    return this.webInvoker.delete<T>(route);
  }
}

export default HttpInvokerWithAuthentication;
