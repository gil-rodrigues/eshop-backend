import Product from 'datasource/typeorm/entities/Product';
import ICreateProductDto from 'models/Product/ICreateProductDto';
import IUpdateProductDto from 'models/Product/IUpdateProductDto';

interface IProductRepository {
  getAll(index: number, take: number): Promise<Product[]>;
  getById(
    id_product: string,
    includeInactive?: boolean
  ): Promise<Product | undefined>;
  create(data: ICreateProductDto): Promise<Product>;
  update(data: IUpdateProductDto): Promise<Product | undefined>;
}

export default IProductRepository;
