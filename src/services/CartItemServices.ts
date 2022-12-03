import ICartItemRepository from 'repositories/ICartItemRepository';
import ICartRepository from 'repositories/ICartRepository';
import Cart from 'datasource/typeorm/entities/Cart';
import ICreateCartItemRequestDto from 'models/CartItem/ICreateCartItemRequestDto';
import { inject, injectable } from 'tsyringe';
import AppError from 'models/AppError';
import IProductRepository from 'repositories/IProductRepository';
import IInternalUpdateCartItemDto from 'models/CartItem/IInternalUpdateCartItemDto';

@injectable()
class CartItemServices {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,

    @inject('CartItemRepository')
    private cartItemRepository: ICartItemRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async addIfNotInCart(
    id_user: string,
    {
      id_cart,
      id_product,
      quantity,
      price,
      final_price
    }: ICreateCartItemRequestDto
  ): Promise<Cart> {
    const product = await this.productRepository.getById(id_product);

    if (!product) {
      throw new AppError(`Product not found: ${id_product}`, 400);
    }

    // todo - check stock

    await this.cartItemRepository.create({
      id_user,
      id_cart,
      id_product,
      quantity,
      price: price ?? product.price,
      final_price: final_price ?? product.price
    });

    const cart = await this.cartRepository.getCartById(id_cart);

    if (!cart) {
      throw new AppError('Product added but cart not found', 500);
    }

    return cart;
  }

  public async updateIfAlreadyInCart({
    newItemRequest,
    oldItem
  }: IInternalUpdateCartItemDto): Promise<Cart | undefined> {
    // todo - verificar stock

    const updatedItem = {
      ...oldItem,
      quantity: oldItem.quantity + newItemRequest.quantity
    };

    await this.cartItemRepository.update(updatedItem);

    const cart = await this.cartRepository.getCartById(newItemRequest.id_cart);

    if (!cart) {
      throw new AppError('Product added but cart not found', 500);
    }

    return cart;
  }

  public async addItemToCart(
    id_user: string,
    createCartItemRequestDto: ICreateCartItemRequestDto
  ): Promise<Cart | undefined> {
    const unpurchasedCart = await this.cartRepository.getNotPurchasedCartById(
      createCartItemRequestDto.id_cart
    );

    if (!unpurchasedCart) {
      throw new AppError('An unpurchased cart was not found', 400);
    }

    const currentCartItem = unpurchasedCart.cartItems?.find(
      item => item.product.id === createCartItemRequestDto.id_product
    );

    if (currentCartItem) {
      return this.updateIfAlreadyInCart({
        newItemRequest: createCartItemRequestDto,
        oldItem: currentCartItem
      });
    }

    return this.addIfNotInCart(id_user, createCartItemRequestDto);
  }
}

export default CartItemServices;
