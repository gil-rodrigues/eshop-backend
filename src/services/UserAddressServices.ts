import { injectable, inject } from 'tsyringe';
import IUserRepository from 'repositories/IUserRepository';
import AppError from 'models/AppError';
import IHashProvider from 'providers/IHashProvider';

import IUserAddressRepository from 'repositories/IUserAddressRepository';
import ICreateUserAddressRequestDto from 'models/UserAddress/ICreateUserAddressRequestDto';
import UserAddress from 'datasource/typeorm/entities/UserAddress';
import IAddressTypeRepository from 'repositories/IAddressTypeRepository';

@injectable()
class UserAddressServices {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserAddressRepository')
    private userAddressRepository: IUserAddressRepository,

    @inject('AddressTypeRepository')
    private addressTypeRepository: IAddressTypeRepository
  ) {}

  public async createUserAddress({
    id_user,
    name,
    address,
    local,
    postal_code,
    region,
    country,
    address_type_code
  }: ICreateUserAddressRequestDto): Promise<UserAddress> {
    const user = await this.userRepository.getById(id_user);

    if (!user) {
      throw new AppError('Cannot add address because user is not active!', 400);
    }

    const addressType = await this.addressTypeRepository.getByCode(
      address_type_code
    );

    if (!addressType) {
      throw new AppError(
        'Cannot add address because addressType is not active!',
        400
      );
    }

    const userAddress = await this.userAddressRepository.create({
      user,
      name,
      address,
      local,
      postal_code,
      region,
      country,
      addressType
    });

    return userAddress;
  }
}

export default UserAddressServices;
