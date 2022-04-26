import User from 'datasource/typeorm/entity/User';
import { getRepository, Repository } from 'typeorm';
import IUsersRepository from './IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async getAll(): Promise<User[]> {
    return this.ormRepository.find();
  }
}

export default UsersRepository;
