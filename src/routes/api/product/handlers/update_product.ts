import { Product } from '../../../../models/products';
import { Request, Response } from 'express';

// updating a product by request /product/:productID route by put method and update a product if it exists

export default async function update(req: Request, res: Response) {
  const productID: string = req.params.productID;
  const { name, price, category } = req.body;

  const product = new Product();
  try {
    const result = await product.show(Number(productID));
    if (result) {
      const updated = await product.update(
        Number(productID),
        name as string,
        Number(price),
        category as string
      );
      res.status(201).json({ msg: `${name} data updated`, product: updated });
    } else {
      res
        .status(404)
        .json({ msg: `product with ID (${productID}) doesn't exist` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
