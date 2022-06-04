import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UserAddressServices from 'services/UserAddressServices';
import IUserAddressRepository from 'repositories/IUserAddressRepository';
import AppError from 'models/AppError';

class UserAddressController {
  // Todo: restrict to only show addresses of own user
  public async index(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.params;

    const userAddressRepository = container.resolve<IUserAddressRepository>(
      'UserAddressRepository'
    );

    const users = await userAddressRepository.getAllByUserId(id_user, false);

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id_user, address_type } = req.params;

    const { name, address, local, postal_code, region, country } = req.body;

    const userAddressServices = container.resolve(UserAddressServices);

    const userAddress = await userAddressServices.createUserAddress({
      id_user,
      address_type_code: address_type,
      name,
      address,
      local,
      postal_code,
      region,
      country
    });

    return res.json(userAddress);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userAddressServices = container.resolve(UserAddressServices);

    const userAddress = await userAddressServices.updateUserAddress({
      id: req.params.id_address,
      id_user: req.user.id,
      ...req.body
    });

    return res.json(userAddress);
  }

  public async inactivate(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userAddressRepository = container.resolve<IUserAddressRepository>(
      'UserAddressRepository'
    );

    try {
      await userAddressRepository.update({
        id,
        inactive: true
      });
    } catch {
      throw new AppError('Could not inactivate user address', 400);
    }

    return res.status(204).json();
  }
}

export default UserAddressController;
