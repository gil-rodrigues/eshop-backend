import { getRepository, Repository } from 'typeorm';
import UserAddress from 'datasource/typeorm/entities/UserAddress';

// import ICreateUserDto from 'models/User/ICreateUserDto';
// import IUpdateUserDto from 'models/User/IUpdateUserDto';
import IGetUserAddressesDto from 'models/UserAddress/IGetUserAddressesDto';
import ICreateUserAddressDto from 'models/UserAddress/ICreateUserAddressDto';
import IUserAddressRepository from './IUserAddressRepository';

class UserAddressRepository implements IUserAddressRepository {
  private ormRepository: Repository<UserAddress>;

  constructor() {
    this.ormRepository = getRepository(UserAddress);
  }

  public async getAllByUserId({
    id_user,
    includeInactive
  }: IGetUserAddressesDto): Promise<UserAddress[]> {
    // let userAddresses = await this.ormRepository.find({
    //   where: { id_user }
    // });

    // if (!includeInactive) {
    //   userAddresses = userAddresses.filter(addr => !addr.inactive);
    // }

    const inactiveIncluded = !!includeInactive;

    const userAddresses = await this.ormRepository
      .createQueryBuilder()
      .where(
        'id_user = :id_user and (inactive = false or inactive = :includeInactive)',
        {
          id_user,
          includeInactive: !!inactiveIncluded
        }
      )
      .getMany();

    return userAddresses;
  }

  // public async getByEmail(email: string): Promise<User | undefined> {
  //   return this.ormRepository.findOne({
  //     where: {
  //       email,
  //       inactive: false
  //     }
  //   });
  // }

  public async create(data: ICreateUserAddressDto): Promise<UserAddress> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  // public async update(data: any): Promise<User> {
  //   const user = await this.ormRepository.save(data);

  //   return user;
  // }
}

export default UserAddressRepository;
