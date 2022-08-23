import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// updating a product quantity in specific order for specific user by request user/:userName/order/product/:ID route by put method and update a order if it exists

export default async function updateOrderProduct(req: Request, res: Response) {
  const orderProductID: string = req.params.ID;
  const { quantity } = req.body;

  // make sure that quantity passed is grater than zero
  if (Number(quantity) <= 0) {
    res.status(400).json({
      msg: `can't update order product`,
      error: 'the quantity must be grater than 0',
    });
    return;
  }

  const order = new Order();

  try {
    // checking if order product already exist
    const result = await order.getOrderProduct(Number(orderProductID));
    if (!result) {
      return res.status(400).json({
        msg: `can't find order product with ID (${orderProductID})`,
      });
    }

    // update product quantity in order
    const updated = await order.updateOrderProduct(
      Number(orderProductID),
      Number(quantity)
    );
    res
      .status(201)
      .json({ msg: `order product quantity updated`, order: updated });
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
