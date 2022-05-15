import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from 'services/AuthenticateUserService';
import AppError from 'models/AppError';
import IAuthenticationResponseDto from 'models/Authentication/IAuthenticationResponseDto';

class AuthenticationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    let authResponse = null as IAuthenticationResponseDto | null;

    try {
      authResponse = await authenticateUser.run({ email, password });

      if (!authResponse) {
        // it goes to catch
        throw new Error();
      }
    } catch (ex) {
      throw new AppError('Authentication error');
    }

    return res.json(authResponse);
  }
}

export default AuthenticationController;
