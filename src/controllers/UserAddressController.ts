import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UserAddressServices from 'services/UserAddressServices';
import AppError from 'models/AppError';
import IUserAddressRepository from 'repositories/IUserAddressRepository';

class UserAddressController {
  // Todo: restrict to only show addresses of own user
  public async show(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.params;

    const userAddressRepository = container.resolve<IUserAddressRepository>(
      'UserAddressRepository'
    );

    const users = await userAddressRepository.getAllByUserId({
      id_user,
      includeInactive: false
    });

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id_user, address_type } = req.params;

    const { name, address, local, postal_code, region, country } = req.body;

    const userAddressServices = container.resolve(UserAddressServices);

    const user = await userAddressServices.createUserAddress({
      id_user,
      address_type_code: address_type,
      name,
      address,
      local,
      postal_code,
      region,
      country
    });

    return res.json(user);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const userService = container.resolve(UserServices);

  //   const user = await userService.updateUser({
  //     id: req.params.id,
  //     ...req.body
  //   });

  //   return res.json(user);
  // }

  // public async inactivate(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const userService = container.resolve(UserServices);

  //   const inactivatedWithSuccess = await userService.inactivateUser(id);

  //   if (!inactivatedWithSuccess)
  //     throw new AppError('Could not inactivate user');

  //   return res.status(204).json();
  // }
}

export default UserAddressController;
