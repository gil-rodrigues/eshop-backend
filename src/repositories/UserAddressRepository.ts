import { FindConditions, getRepository, Repository } from 'typeorm';
import UserAddress from 'datasource/typeorm/entities/UserAddress';

import ICreateUserAddressDto from 'models/UserAddress/ICreateUserAddressDto';
import IUpdateUserAddressDto from 'models/UserAddress/IUpdateUserAddressDto';
import IUserAddressRepository from './IUserAddressRepository';

class UserAddressRepository implements IUserAddressRepository {
  private ormRepository: Repository<UserAddress>;

  constructor() {
    this.ormRepository = getRepository(UserAddress);
  }

  public async getById(
    id_address: string,
    includeInactive?: boolean
  ): Promise<UserAddress | undefined> {
    const whereConditions = {
      id: id_address,
      inactive: false
    } as FindConditions<UserAddress>;

    if (includeInactive) {
      delete whereConditions.inactive;
    }

    const userAddress = await this.ormRepository.findOne({
      where: whereConditions
    });

    return userAddress;
  }

  public async getAllByUserId(
    id_user: string,
    includeInactive?: boolean
  ): Promise<UserAddress[]> {
    const whereConditions = {
      id_user,
      inactive: false
    } as FindConditions<UserAddress>;

    if (includeInactive) {
      delete whereConditions.inactive;
    }

    const userAddresses = await this.ormRepository.find({
      where: whereConditions
    });

    return userAddresses;
  }

  public async create(data: ICreateUserAddressDto): Promise<UserAddress> {
    const userAddress = this.ormRepository.create(data);

    await this.ormRepository.save(userAddress);

    return userAddress;
  }

  public async update(data: IUpdateUserAddressDto): Promise<UserAddress> {
    const userAddress = await this.ormRepository.save(data);

    return userAddress;
  }
}

export default UserAddressRepository;
