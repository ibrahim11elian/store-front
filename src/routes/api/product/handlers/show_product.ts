import { Product } from '../../../../models/products';
import { Request, Response } from 'express';

// get a specific product by request /product/:productID route by get method and return a product if exist

export default async function getProduct(req: Request, res: Response) {
  const productID: string = req.params.productID;
  const product = new Product();
  try {
    const result = await product.show(Number(productID));
    if (result) res.status(200).json(result);
    else {
      res
        .status(400)
        .json({ msg: `can't find product with ID (${productID})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
