import ICreateProductDesignationDto from './ICreateProductDesignationDto';

interface ICreateProductRequestDto {
  price: number;
  discount_price: number;
  productDesignationList?: ICreateProductDesignationDto[];
}

export default ICreateProductRequestDto;
