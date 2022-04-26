import User from 'datasource/typeorm/entity/User';

interface IUsersRepository {
  getAll(): Promise<User[]>;
}

export default IUsersRepository;
