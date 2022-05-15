import { container } from 'tsyringe';

import IHashProvider from 'providers/IHashProvider';
import BCryptHashProvider from 'providers/BCryptHashProvider';

import IUserRepository from 'repositories/IUserRepository';
import UserRepository from 'repositories/UserRepository';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
