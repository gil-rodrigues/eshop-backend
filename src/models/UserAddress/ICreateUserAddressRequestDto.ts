interface ICreateUserAddressRequestDto {
  id_user: string;
  name: string;
  address: string;
  local: string;
  postal_code: string;
  region: string;
  country: string;
  address_type_code: string;
}

export default ICreateUserAddressRequestDto;
