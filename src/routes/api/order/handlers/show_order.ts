import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';

// get a specific order by request /order/:orderID route by get method and return a order if exist

export default async function getOrder(req: Request, res: Response) {
  const orderID: string = req.params.orderID;
  const order = new Order();
  try {
    const result = await order.show(Number(orderID));
    if (result) res.status(200).json(result);
    else {
      res.status(400).json({ msg: `can't find order with ID (${orderID})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
