import { FindConditions, getRepository, Repository } from 'typeorm';

import Product from 'datasource/typeorm/entities/Product';
import ICreateProductDto from 'models/Product/ICreateProductDto';
import IUpdateProductDto from 'models/Product/IUpdateProductDto';
import IProductRepository from 'repositories/IProductRepository';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async getAll(
    index: number,
    take: number,
    includeInactive?: boolean
  ): Promise<Product[]> {
    const whereConditions = {
      inactive: false
    } as FindConditions<Product>;

    if (includeInactive) {
      delete whereConditions.inactive;
    }

    const products = await this.ormRepository.find({
      where: whereConditions,
      skip: index,
      take
    });

    return products;
  }

  public async getById(
    id_product: string,
    includeInactive?: boolean
  ): Promise<Product | undefined> {
    const whereConditions = {
      id: id_product,
      inactive: false
    } as FindConditions<Product>;

    if (includeInactive) {
      delete whereConditions.inactive;
    }

    const product = await this.ormRepository.findOne({
      where: whereConditions
    });

    return product;
  }

  public async create(data: ICreateProductDto): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async update(data: IUpdateProductDto): Promise<Product | undefined> {
    const product = await this.ormRepository.save(data);

    return product;
  }
}

export default ProductRepository;
