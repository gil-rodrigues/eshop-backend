import { getRepository, Repository } from 'typeorm';
import User from 'datasource/typeorm/entities/User';

import ICreateUserDto from 'models/User/ICreateUserDto';
import IUpdateUserDto from 'models/User/IUpdateUserDto';
import IUserRepository from './IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async getAll(includeInactive?: boolean): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: [{ inactive: false }, { inactive: !!includeInactive }]
    });

    return users;
  }

  public async getById(guid: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: guid, inactive: false }
    });

    return user;
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
        inactive: false
      }
    });
  }

  public async create(data: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(data: IUpdateUserDto): Promise<User> {
    const user = await this.ormRepository.save(data);

    return user;
  }
}

export default UserRepository;
