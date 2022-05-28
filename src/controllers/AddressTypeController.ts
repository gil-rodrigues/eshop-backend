import { Request, Response } from 'express';

import { container } from 'tsyringe';

import IAddressTypeRepository from 'repositories/IAddressTypeRepository';
import AppError from 'models/AppError';

class AddressTypeController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { code } = req.params;

    const addressTypeRepository = container.resolve<IAddressTypeRepository>(
      'AddressTypeRepository'
    );

    const addressType = await addressTypeRepository.getByCode(code);

    return res.json(addressType);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { code, description } = req.body;

    const addressTypeRepository = container.resolve<IAddressTypeRepository>(
      'AddressTypeRepository'
    );

    const addressType = await addressTypeRepository.create({
      code,
      description
    });

    return res.json(addressType);
  }

  public async inactivate(req: Request, res: Response): Promise<Response> {
    const { code } = req.params;

    const addressTypeRepository = container.resolve<IAddressTypeRepository>(
      'AddressTypeRepository'
    );

    const inactivatedWithSuccess = await addressTypeRepository.updateByCode({
      currentCode: code,
      inactive: true
    });

    if (!inactivatedWithSuccess)
      throw new AppError('Could not inactivate addressType');

    return res.status(204).json();
  }
}

export default AddressTypeController;
