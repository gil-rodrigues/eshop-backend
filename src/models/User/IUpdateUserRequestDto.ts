interface IUpdateUserRequestDto {
  id: string;
  name?: string;
  cellphone_number?: string;
  inactive?: boolean;
}

export default IUpdateUserRequestDto;
