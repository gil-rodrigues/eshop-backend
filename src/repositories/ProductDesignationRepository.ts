import ProductDesignation from 'datasource/typeorm/entities/ProductDesignation';
import AppError from 'models/AppError';
import ICreateProductDesignationDto from 'models/Product/ICreateProductDesignationDto';
import { getRepository, In, Repository } from 'typeorm';
import IProductDesignationRepository from './IProductDesignationRepository';

class ProductDesignationRepository implements IProductDesignationRepository {
  private ormRepository: Repository<ProductDesignation>;

  constructor() {
    this.ormRepository = getRepository(ProductDesignation);
  }

  async createAll(
    designationList: ICreateProductDesignationDto[]
  ): Promise<ProductDesignation[]> {
    const designations = this.ormRepository.create(designationList);

    await this.ormRepository.save(designations);

    return designations;
  }

  async getAllByDesignationListAndLanguageCode(
    designationList: ICreateProductDesignationDto[]
  ): Promise<ProductDesignation[]> {
    const productDesignationPromises: Promise<ProductDesignation[]>[] = [];
    let productDesignations: ProductDesignation[] = [];

    const languageCodesList = designationList
      .map(dl => dl.code_lang)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    languageCodesList.forEach(langCode => {
      productDesignationPromises.push(
        this.ormRepository.find({
          where: {
            description: In(
              designationList
                .filter(dl => dl.code_lang === langCode)
                .map(dl => dl.description)
            ),
            code_lang: langCode
          }
        })
      );
    });

    const values = await Promise.allSettled(productDesignationPromises);

    values.forEach(v => {
      if (v.status !== 'fulfilled') {
        throw new AppError(`Couldn't process file descriptions`);
      } else {
        productDesignations = productDesignations.concat(v.value);
      }
    });

    return productDesignations;
  }

  async updateById(designationId: string): Promise<ProductDesignation> {
    throw new Error(`${designationId} Method not implemented.`);
  }

  async deleteById(designationId: string): Promise<boolean> {
    throw new Error(`${designationId} Method not implemented.`);
  }
}

export default ProductDesignationRepository;
