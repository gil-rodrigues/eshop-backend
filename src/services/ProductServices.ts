import Product from 'datasource/typeorm/entities/Product';
import ProductDesignation from 'datasource/typeorm/entities/ProductDesignation';
import AppError from 'models/AppError';
import ICreateProductDto from 'models/Product/ICreateProductDto';
import ICreateProductRequestDto from 'models/Product/ICreateProductRequestDto';
import IProductDesignationRepository from 'repositories/IProductDesignationRepository';
import IProductRepository from 'repositories/IProductRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ProductServices {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('ProductDesignationRepository')
    private productDesignationRepository: IProductDesignationRepository
  ) {}

  public async getAllIndexed(index: number, take: number) {
    const products = await this.productRepository.getAll(index, take);

    return products;
  }

  public async getById(productId: string, includeInactive?: boolean) {
    const product = await this.productRepository.getById(
      productId,
      includeInactive
    );

    return product;
  }

  public async createProduct({
    price,
    discount_price,
    productDesignationList
  }: ICreateProductRequestDto): Promise<Product | undefined> {
    let productDesignations: ProductDesignation[] = [];

    const productDto = {
      price,
      discount_price,
      productDesignationList
    } as ICreateProductDto;

    if (productDesignationList && productDesignationList.length > 0) {
      const productDesignationsInStore =
        await this.productDesignationRepository.getAllByDesignationListAndLanguageCode(
          productDesignationList
        );

      if (productDesignationsInStore && productDesignationsInStore.length > 0) {
        const productDesignationsRepeated = productDesignationList.filter(
          pd =>
            productDesignationsInStore.findIndex(
              pds =>
                pds.description === pd.description &&
                pds.code_lang === pd.code_lang
            ) !== -1
        );

        throw new AppError(
          `Designations already in store: ${productDesignationsRepeated.reduce(
            (prev, cur) => {
              return `${`${prev + cur.code_lang} ${cur.description}`};`;
            },
            ''
          )}`
        );
      }
    }
    const product = await this.productRepository.create(productDto);

    if (!product) return undefined;

    if (product?.id && productDesignationList) {
      productDesignations = await this.productDesignationRepository.createAll(
        productDesignationList.map(pd => ({
          id_product: product.id,
          ...pd
        }))
      );
    }

    return {
      ...product,
      productDesignations
    };
  }

  // public async updateProduct

  // public async updateProductDesignation

  // public async inactivateProduct
}

export default ProductServices;
