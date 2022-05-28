import { getRepository, Repository } from 'typeorm';

import AddressType from 'datasource/typeorm/entities/AddressType';
import ICreateAddressTypeDto from 'models/AddressType/ICreateAddressTypeDto';
import IUpdateAddressTypeDto from 'models/AddressType/IUpdateAddressTypeDto';
import AppError from 'models/AppError';
import IAddressTypeRepository from 'repositories/IAddressTypeRepository';

class AddressTypeRepository implements IAddressTypeRepository {
  private ormRepository: Repository<AddressType>;

  constructor() {
    this.ormRepository = getRepository(AddressType);
  }

  public async getByCode(
    addressTypeCode: string
  ): Promise<AddressType | undefined> {
    const addressType = await this.ormRepository.findOne({
      where: { code: addressTypeCode }
    });

    return addressType;
  }

  public async create(data: ICreateAddressTypeDto): Promise<AddressType> {
    const addressTypeInStore = await this.ormRepository.find({
      where: {
        code: data.code
      }
    });

    if (addressTypeInStore && addressTypeInStore.length > 0)
      throw new AppError(
        'Cannot create AddressType with duplicate addressType',
        400
      );

    const addressType = this.ormRepository.create(data);

    await this.ormRepository.save(addressType);

    return addressType;
  }

  public async updateByCode(data: IUpdateAddressTypeDto): Promise<AddressType> {
    if (!data.currentCode) {
      throw new AppError('Cannot update AddressType without current code', 400);
    }

    const addressType = await this.ormRepository.findOne({
      where: {
        code: data.currentCode
      }
    });

    if (!addressType)
      throw new AppError(
        'When trying to update, unable to find the given AddressType.',
        400
      );

    const updatedAddressTypeData = {
      ...data,
      id: addressType.id,
      code: data.currentCode
    };

    delete updatedAddressTypeData.currentCode;
    delete updatedAddressTypeData.updatedCode;

    const updatedAddressType = await this.ormRepository.save(
      updatedAddressTypeData
    );

    return updatedAddressType;
  }
}

export default AddressTypeRepository;
