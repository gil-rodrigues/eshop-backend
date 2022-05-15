import User from 'datasource/typeorm/entities/User';

export interface IAuthenticationResponseDto {
  user: User;

  token: string;
}

export default IAuthenticationResponseDto;
