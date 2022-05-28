import AddressType from 'datasource/typeorm/entities/AddressType';
import ICreateAddressTypeDto from 'models/AddressType/ICreateAddressTypeDto';
import IUpdateAddressTypeDto from 'models/AddressType/IUpdateAddressTypeDto';

interface IAddressTypeRepository {
  getByCode(addressTypeCode: string): Promise<AddressType | undefined>;

  create(data: ICreateAddressTypeDto): Promise<AddressType | undefined>;

  updateByCode(data: IUpdateAddressTypeDto): Promise<AddressType | undefined>;
}

export default IAddressTypeRepository;
