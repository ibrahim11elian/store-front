import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// adding a new product to specific order for specific user by request /user/:userName/order/product route by post method

export default async function addOrderProduct(req: Request, res: Response) {
  const user = req.params.userName;
  const orderID: number = req.body.orderID;
  const productID = req.body.productID;
  const quantity = req.body.quantity;

  if (Number(quantity) <= 0) {
    res.status(400).json({
      msg: `can't update order product`,
      error: 'the quantity must be grater than 0',
    });
    return;
  }

  const order = new Order();

  try {
    // for checking if user has order with id equal the passed id
    const userOrder = await order.show(Number(orderID));

    if (userOrder?.user_name !== user) {
      res.status(400).json({
        msg: `there is no order with ID (${orderID}) for user ${user}`,
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ eror: `order id must be number` });
    return;
  }

  try {
    // if there is product already in order with product id equal to the passed one update the existing quantity
    const o = await order.getProducts();

    if (o?.length) {
      const orderProduct = o.find(
        (order) => order.p_id === productID && order.o_id === orderID
      );

      if (orderProduct) {
        const updated = await order.updateOrderProduct(
          Number(orderProduct.id),
          Number(quantity)
        );
        res
          .status(201)
          .json({ msg: `order ${orderID} quantity updated`, order: updated });
        return;
      }
    }

    const result = await order.addProduct(
      Number(orderID),
      Number(productID),
      Number(quantity)
    );

    res.status(201).json({
      msg: `product with ID (${productID}) added to order with ID (${orderID})  for user: ${user}`,
      result: result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `can't add product to order may be product doesn't exist` });
  }
}
