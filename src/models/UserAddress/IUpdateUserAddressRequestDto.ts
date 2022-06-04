interface IUpdateUserAddressRequestDto {
  id: string;
  name?: string;
  address?: string;
  local?: string;
  postal_code?: string;
  region?: string;
  country?: string;
  id_user: string;
}

export default IUpdateUserAddressRequestDto;
