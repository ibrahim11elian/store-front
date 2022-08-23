import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// getting all orders by request /order route by get method and return a all orders

export default async function index(req: Request, res: Response) {
  const order = new Order();
  try {
    const result = await order.index();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get orders` });
  }
}
