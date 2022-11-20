import { container } from 'tsyringe';

import IHashProvider from 'providers/IHashProvider';
import BCryptHashProvider from 'providers/BCryptHashProvider';

import IUserRepository from 'repositories/IUserRepository';
import UserRepository from 'repositories/UserRepository';
import IUserAddressRepository from 'repositories/IUserAddressRepository';
import UserAddressRepository from 'repositories/UserAddressRepository';
import IAddressTypeRepository from 'repositories/IAddressTypeRepository';
import AddressTypeRepository from 'repositories/AddressTypeRepository';
import ICartRepository from 'repositories/ICartRepository';
import CartRepository from 'repositories/CartRepository';
import IProductRepository from 'repositories/IProductRepository';
import ProductRepository from 'repositories/ProductRepository';
import ILanguageRepository from 'repositories/ILanguageRepository';
import LanguageRepository from 'repositories/LanguageRepository';
import IProductDesignationRepository from 'repositories/IProductDesignationRepository';
import ProductDesignationRepository from 'repositories/ProductDesignationRepository';

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

container.registerSingleton<ICartRepository>('CartRepository', CartRepository);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductDesignationRepository>(
  'ProductDesignationRepository',
  ProductDesignationRepository
);

container.registerSingleton<ILanguageRepository>(
  'LanguageRepository',
  LanguageRepository
);
