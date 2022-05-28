import AddressType from 'datasource/typeorm/entities/AddressType';
import User from 'datasource/typeorm/entities/User';

interface ICreateUserAddressDto {
  user: User;
  name: string;
  address: string;
  local: string;
  postal_code: string;
  region: string;
  country: string;
  addressType: AddressType;
}

export default ICreateUserAddressDto;
