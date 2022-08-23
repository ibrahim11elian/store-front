import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// deleting a product in order by request user/:userName/order/product/:ID route by delete method and delete a order if exist

export default async function deleteOrderProduct(req: Request, res: Response) {
  const orderProductID: string = req.params.id;
  console.log(orderProductID);

  const order = new Order();

  try {
    // checking if order product already exist
    const result = await order.getOrderProduct(Number(orderProductID));
    if (!result) {
      return res.status(400).json({
        msg: `can't find order product with ID (${orderProductID})`,
      });
    }

    //   delete product in order
    const deleted = await order.deleteOrderProduct(Number(orderProductID));
    res.status(200).json({ msg: deleted });
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
