import { injectable, inject } from 'tsyringe';
import IUserRepository from 'repositories/IUserRepository';
import AppError from 'models/AppError';

import IUserAddressRepository from 'repositories/IUserAddressRepository';
import ICreateUserAddressRequestDto from 'models/UserAddress/ICreateUserAddressRequestDto';
import UserAddress from 'datasource/typeorm/entities/UserAddress';
import IAddressTypeRepository from 'repositories/IAddressTypeRepository';
import StringFormatUtils from 'helpers/StringFormatUtils';
import IUpdateUserAddressRequestDto from 'models/UserAddress/IUpdateUserAddressRequestDto';
import IUpdateUserAddressDto from 'models/UserAddress/IUpdateUserAddressDto';

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

    const trimmedName = StringFormatUtils.TrimExtraSpaces(name);

    const userAddressesInStore =
      await this.userAddressRepository.getAllByUserId(id_user);

    if (
      userAddressesInStore.findIndex(addr => addr.name === trimmedName) !== -1
    ) {
      throw new AppError('Address name matches existing name!', 400);
    }

    const userAddress = await this.userAddressRepository.create({
      user,
      name: trimmedName,
      address,
      local,
      postal_code,
      region,
      country,
      addressType
    });

    return userAddress;
  }

  public async updateUserAddress(
    data: IUpdateUserAddressRequestDto
  ): Promise<UserAddress> {
    const userAddressesInStore =
      await this.userAddressRepository.getAllByUserId(data.id_user);

    if (userAddressesInStore.findIndex(addr => addr.id === data.id) === -1)
      throw new AppError('Address to be updated does not exist', 400);

    let trimmedName: string | undefined;

    // If the user wants to update name, don't allow creating one with duplicate name.
    if (data.name) {
      trimmedName = StringFormatUtils.TrimExtraSpaces(data.name);

      if (
        userAddressesInStore.findIndex(
          addr => addr.name === trimmedName && addr.id !== data.id
        ) !== -1
      ) {
        throw new AppError('Address name matches existing name!', 400);
      }
    }

    const userAddressDataToUpdate = {
      name: trimmedName,
      ...data
    } as IUpdateUserAddressDto;

    const updatedUserAddress = await this.userAddressRepository.update(
      userAddressDataToUpdate
    );

    return updatedUserAddress;
  }
}

export default UserAddressServices;
