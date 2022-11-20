import ICreateProductDesignationDto from './ICreateProductDesignationDto';

interface ICreateProductDto {
  price: number;
  discount_price: number;
  productDesignations?: ICreateProductDesignationDto[];
}

export default ICreateProductDto;
