import { Product } from '../../../../models/products';
import { Request, Response } from 'express';

// get products by its category request /product/:category route by get method and return a products if exist

export default async function ProductsByCategory(req: Request, res: Response) {
  const category: string = req.params.category;
  const product = new Product();
  try {
    const result = await product.productByCategory(category);
    if (result) res.status(200).json(result);
    else {
      res
        .status(400)
        .json({ msg: `can't find products in category (${category})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
