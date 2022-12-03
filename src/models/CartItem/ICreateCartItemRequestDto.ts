interface ICreateCartItemRequestDto {
  id_cart: string;
  id_product: string;
  quantity: number;
  price?: number;
  final_price?: number;
}

export default ICreateCartItemRequestDto;
