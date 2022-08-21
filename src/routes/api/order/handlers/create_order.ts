import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';

// creating a new order by request user/:userName/order route by post method and return a new order

export default async function create(req: Request, res: Response) {
  const user = req.params.userName;
  const orderStatus = req.body.status;
  if (orderStatus !== 'active' && orderStatus !== 'complete') {
    res.status(400).json({
      msg: `can't create order`,
      error: 'the status must be active or complete',
    });
    return;
  }
  const order = new Order();

  try {
    const result = await order.create(user, orderStatus);

    res.status(201).json({ msg: 'order created', order: result });
  } catch (error) {
    res.status(400).json({ msg: `can't create order` });
  }
}
