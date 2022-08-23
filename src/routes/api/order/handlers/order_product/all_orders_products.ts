import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// getting all products added to all orders by request /order/product route by get method

export default async function getAllProducts(req: Request, res: Response) {
  const order = new Order();
  try {
    const result = await order.getProducts();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get data` });
  }
}
