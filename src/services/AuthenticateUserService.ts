import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUserRepository from 'repositories/IUserRepository';
import IHashProvider from 'providers/IHashProvider';
import AppError from 'models/AppError';
import IAuthenticationRequestDto from 'models/Authentication/IAuthenticationRequestDto';
import IAuthenticationResponseDto from 'models/Authentication/IAuthenticationResponseDto';

import authConfig from 'config/auth';
import { instanceToInstance } from 'class-transformer';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async run({
    email,
    password
  }: IAuthenticationRequestDto): Promise<IAuthenticationResponseDto> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new AppError('Authentication Error', 401);
    }

    const isCorrectPassword = await this.hashProvider.compareHashes(
      password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new AppError('Authentication Error', 401);
    }

    const token = sign({}, authConfig.jwt.secret ?? '', {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      token,
      user: instanceToInstance(user)
    } as IAuthenticationResponseDto;
  }
}

export default AuthenticateUserService;
