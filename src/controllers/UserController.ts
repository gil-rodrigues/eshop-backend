import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UserServices from 'services/UserServices';
import IUserRepository from 'repositories/IUserRepository';
import AppError from 'models/AppError';

class UserController {
  public async show(req: Request, res: Response): Promise<Response> {
    const usersRepository =
      container.resolve<IUserRepository>('UserRepository');

    const users = await usersRepository.getAll();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, password, email, cellphone_number } = req.body;

    const userServices = container.resolve(UserServices);

    const user = await userServices.createUser({
      name,
      password,
      email,
      cellphone_number
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve(UserServices);

    const user = await userService.updateUser({
      id: req.params.id,
      ...req.body
    });

    return res.json(user);
  }

  public async inactivate(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userService = container.resolve(UserServices);

    const inactivatedWithSuccess = await userService.inactivateUser(id);

    if (!inactivatedWithSuccess)
      throw new AppError('Could not inactivate user');

    return res.status(204).json();
  }
}

export default UserController;
