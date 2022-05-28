import User from 'datasource/typeorm/entities/User';
import ICreateUserDto from 'models/User/ICreateUserDto';
import IUpdateUserDto from 'models/User/IUpdateUserDto';

interface IUserRepository {
  getAll(includeInactive?: boolean): Promise<User[]>;

  getById(guid: string): Promise<User | undefined>;

  getByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateUserDto): Promise<User>;

  update(data: IUpdateUserDto): Promise<User>;
}

export default IUserRepository;
