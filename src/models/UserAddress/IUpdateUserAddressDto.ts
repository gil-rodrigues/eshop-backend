interface IUpdateUserAddressDto {
  id: string;
  name?: string;
  address?: string;
  local?: string;
  postal_code?: string;
  region?: string;
  country?: string;
  inactive?: boolean;
}

export default IUpdateUserAddressDto;
