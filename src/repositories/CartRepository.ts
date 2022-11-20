import { getRepository, Repository } from 'typeorm';

import ICartRepository from 'repositories/ICartRepository';
import ICreateCartDto from 'models/Cart/ICreateCartDto';
import Cart from 'datasource/typeorm/entities/Cart';

class CartRepository implements ICartRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  // public async getByCode(
  //   addressTypeCode: string
  // ): Promise<AddressType | undefined> {
  //   const addressType = await this.ormRepository.findOne({
  //     where: { code: addressTypeCode }
  //   });

  //   return addressType;
  // }

  public async create(data: ICreateCartDto): Promise<Cart> {
    const cart = await this.ormRepository.create(data);

    await this.ormRepository.save(cart);

    return cart;
  }

  // public async updateByCode(data: IUpdateAddressTypeDto): Promise<AddressType> {
  //   if (!data.currentCode) {
  //     throw new AppError('Cannot update AddressType without current code', 400);
  //   }

  //   const addressType = await this.ormRepository.findOne({
  //     where: {
  //       code: data.currentCode
  //     }
  //   });

  //   if (!addressType)
  //     throw new AppError(
  //       'When trying to update, unable to find the given AddressType.',
  //       400
  //     );

  //   const updatedAddressTypeData = {
  //     ...data,
  //     id: addressType.id,
  //     code: data.currentCode
  //   };

  //   delete updatedAddressTypeData.currentCode;
  //   delete updatedAddressTypeData.updatedCode;

  //   const updatedAddressType = await this.ormRepository.save(
  //     updatedAddressTypeData
  //   );

  //   return updatedAddressType;
  // }
}

export default CartRepository;
