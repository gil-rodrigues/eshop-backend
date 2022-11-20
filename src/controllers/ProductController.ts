import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductServices from 'services/ProductServices';
import AppError from 'models/AppError';

// Todo: restrict only to specific kinds of user
class ProductController {
  // Accept index. Max 100 at a time
  public async index(req: Request, res: Response): Promise<Response> {
    const { index: indexString, take: takeString } = req.query;

    let index: number | undefined;
    let take: number | undefined;

    try {
      index = parseInt(indexString as string, 10);
      take = parseInt(takeString as string, 10);
    } catch {
      throw new AppError('Invalid index or take', 400);
    }

    const productServices = container.resolve(ProductServices);

    const products = await productServices.getAllIndexed(index, take);

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;

    const productServices = container.resolve(ProductServices);

    const product = productServices.getById(productId);

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { price, discount_price, productDesignationList } = req.body;

    const productServices = container.resolve(ProductServices);

    const product = await productServices.createProduct({
      price,
      discount_price,
      productDesignationList
    });

    return res.json(product);
  }

  // todo: not yet implemented
  public async update(req: Request, res: Response): Promise<Response> {
    // const userAddressServices = container.resolve(UserAddressServices);

    // const userAddress = await userAddressServices.updateUserAddress({
    //   id: req.params.id_address,
    //   id_user: req.user.id,
    //   ...req.body
    // });

    return res.json({});
  }

  // todo: not yet implemented
  public async inactivate(req: Request, res: Response): Promise<Response> {
    // const { id } = req.params;

    // const userAddressRepository = container.resolve<IUserAddressRepository>(
    //   'UserAddressRepository'
    // );

    // try {
    //   await userAddressRepository.update({
    //     id,
    //     inactive: true
    //   });
    // } catch {
    //   throw new AppError('Could not inactivate user address', 400);
    // }

    return res.json({});
  }
}

export default ProductController;
