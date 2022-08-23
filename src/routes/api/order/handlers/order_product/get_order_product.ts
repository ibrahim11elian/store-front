import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// get specific product in specific order by request /order/product/:ID route by get method and return a order product if exist

export default async function getOrderProduct(req: Request, res: Response) {
  const orderproductID: string = req.params.ID;
  const order = new Order();
  try {
    const result = await order.getOrderProduct(Number(orderproductID));
    if (result) res.status(200).json(result);
    else {
      res.status(400).json({
        msg: `can't find order product with ID (${orderproductID})`,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
