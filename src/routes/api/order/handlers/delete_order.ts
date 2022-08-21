import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';

// deleting a order by request user/:userName/order/:orderID route by delete method and delete a order if exist

export default async function deleteOrder(req: Request, res: Response) {
  const orderID: string = req.params.orderID;
  const userName: string = req.params.userName;
  const order = new Order();
  try {
    const result = await order.show(Number(orderID));
    if (result && userName === result.user_name) {
      const deleted = await order.delete(Number(orderID));
      res.status(200).json({ msg: deleted });
    } else {
      res.status(404).json({
        msg: `can't find order for user (${userName}) with ID (${orderID})`,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
