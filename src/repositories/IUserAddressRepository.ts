import UserAddress from 'datasource/typeorm/entities/UserAddress';
import ICreateUserAddressDto from 'models/UserAddress/ICreateUserAddressDto';
import IUpdateUserAddressDto from 'models/UserAddress/IUpdateUserAddressDto';
// import IUpdateUserDto from 'models/User/IUpdateUserDto';

interface IUserRepository {
  getById(
    id_address: string,
    includeInactive?: boolean
  ): Promise<UserAddress | undefined>;

  getAllByUserId(
    id_user: string,
    includeInactive?: boolean
  ): Promise<UserAddress[]>;

  create(data: ICreateUserAddressDto): Promise<UserAddress>;

  update(data: IUpdateUserAddressDto): Promise<UserAddress>;
}

export default IUserRepository;
