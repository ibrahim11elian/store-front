import { Product, PRODUCT } from '../../../../models/products';
import { Request, Response } from 'express';

// creating a new product by request /product route by post method and return a new product

export default async function create(req: Request, res: Response) {
  const newProduct: PRODUCT = req.body;
  const product = new Product();
  try {
    const result = await product.create(newProduct);

    res.status(201).json({ msg: 'product created', product: result });
  } catch (error) {
    res.status(400).json({ msg: `can't create pruduct` });
  }
}
