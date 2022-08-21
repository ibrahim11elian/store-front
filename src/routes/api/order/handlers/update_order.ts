import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';

// updating a order by request user/:userName/order/:orderID route by put method and update a order if it exists

export default async function update(req: Request, res: Response) {
  const orderID: string = req.params.orderID;
  const userName: string = req.params.userName;
  const { status } = req.body;

  if (status !== 'active' && status !== 'complete') {
    res.status(400).json({
      msg: `can't update order`,
      error: 'the status must be active or complete',
    });
    return;
  }

  const order = new Order();
  try {
    const result = await order.show(Number(orderID));

    if (result && userName === result.user_name) {
      const updated = await order.update(Number(orderID), status as string);
      res
        .status(201)
        .json({ msg: `order ${orderID} status updated`, order: updated });
    } else {
      res.status(404).json({
        msg: `can't find order for user (${userName}) with ID (${orderID})`,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
