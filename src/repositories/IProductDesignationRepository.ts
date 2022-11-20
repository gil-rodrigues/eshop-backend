import ProductDesignation from 'datasource/typeorm/entities/ProductDesignation';
import ICreateProductDesignationDto from 'models/Product/ICreateProductDesignationDto';

interface IProductDesignationRepository {
  createAll(
    designationList: ICreateProductDesignationDto[]
  ): Promise<ProductDesignation[]>;

  getAllByDesignationListAndLanguageCode(
    designationList: ICreateProductDesignationDto[]
  ): Promise<ProductDesignation[]>;

  updateById(designationId: string): Promise<ProductDesignation>;

  deleteById(designationId: string): Promise<boolean>;
}

export default IProductDesignationRepository;
