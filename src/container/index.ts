import { container } from 'tsyringe';

import IHashProvider from 'providers/IHashProvider';
import BCryptHashProvider from 'providers/BCryptHashProvider';

import IUserRepository from 'repositories/IUserRepository';
import UserRepository from 'repositories/UserRepository';
import IUserAddressRepository from 'repositories/IUserAddressRepository';
import UserAddressRepository from 'repositories/UserAddressRepository';
import IAddressTypeRepository from 'repositories/IAddressTypeRepository';
import AddressTypeRepository from 'repositories/AddressTypeRepository';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserAddressRepository>(
  'UserAddressRepository',
  UserAddressRepository
);

container.registerSingleton<IAddressTypeRepository>(
  'AddressTypeRepository',
  AddressTypeRepository
);
