import { Product } from '../../../../models/products';
import { deleteAllOrderProducts } from '../../order/handlers/order/delete_order';
import { Request, Response } from 'express';

// deleting a pruduct by request /product/:productID route by delete method and delete a product if exist

export default async function deleteProduct(req: Request, res: Response) {
  const productID: string = req.params.productID;
  const product = new Product();
  try {
    const result = await product.show(Number(productID));
    if (result) {
      await deleteAllOrderProducts(Number(productID), 'p');
      const deleted = await product.delete(Number(productID));
      res.status(200).json({ msg: deleted });
    } else {
      res
        .status(404)
        .json({ msg: `can't find product with ID (${productID})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
