import { Product } from '../../../../models/products';
import { Request, Response } from 'express';

// getting all products by request /product route by get method and return a all products

export default async function index(req: Request, res: Response) {
  const product = new Product();
  try {
    const result = await product.index();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get products` });
  }
}
