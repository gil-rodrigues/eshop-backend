import { injectable, inject } from 'tsyringe';
import IUserRepository from 'repositories/IUserRepository';
import User from 'datasource/typeorm/entities/User';
import AppError from 'models/AppError';
import IHashProvider from 'providers/IHashProvider';
import IUpdateUserRequestDto from 'models/User/IUpdateUserDto';

import { instanceToInstance } from 'class-transformer';

interface ICreateUserRequest {
  name: string;
  password: string;
  email: string;
  cellphone_number: string;
}

@injectable()
class UserServices {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async createUser({
    name,
    password,
    email,
    cellphone_number
  }: ICreateUserRequest): Promise<User> {
    const userInStore = await this.userRepository.getByEmail(email);

    if (userInStore) {
      throw new AppError('User with same email already exists.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      password: hashedPassword,
      email,
      cellphone_number
    });

    return instanceToInstance(user);
  }

  public async updateUser(data: IUpdateUserRequestDto): Promise<User> {
    // todo - insert validations

    const user = await this.userRepository.update(data);

    return instanceToInstance(user);
  }

  public async inactivateUser(userGuid: string): Promise<void> {
    // todo - insert validations

    try {
      await this.userRepository.update({
        id: userGuid,
        inactive: true
      });
    } catch {
      throw new AppError('Could not inactivate user.', 400);
    }
  }
}

export default UserServices;
