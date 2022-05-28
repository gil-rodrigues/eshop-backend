import UserAddress from 'datasource/typeorm/entities/UserAddress';
import IGetUserAddressesDto from 'models/UserAddress/IGetUserAddressesDto';
import ICreateUserAddressDto from 'models/UserAddress/ICreateUserAddressDto';
// import IUpdateUserDto from 'models/User/IUpdateUserDto';

interface IUserRepository {
  getAllByUserId(data: IGetUserAddressesDto): Promise<UserAddress[]>;

  create(data: ICreateUserAddressDto): Promise<UserAddress>;

  // update(data: any): Promise<User>;
}

export default IUserRepository;
