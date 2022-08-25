import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';

const order = new Order();

// creating a new order by request user/:userName/order route by post method and return a new order

async function create(req: Request, res: Response) {
  const user = req.params.userName;
  const orderStatus = req.body.status;
  if (orderStatus !== 'active' && orderStatus !== 'complete') {
    res.status(400).json({
      msg: `can't create order`,
      error: 'the status must be active or complete',
    });
    return;
  }

  try {
    const result = await order.create(user, orderStatus);

    res.status(201).json({ msg: 'order created', order: result });
  } catch (error) {
    res.status(400).json({ msg: `can't create order` });
  }
}

// getting all orders by request /order route by get method and return a all orders

async function index(req: Request, res: Response) {
  try {
    const result = await order.index();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get orders` });
  }
}

// get a specific order by request /order/:orderID route by get method and return a order if exist

async function getOrder(req: Request, res: Response) {
  const orderID: string = req.params.orderID;

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

// updating a order by request user/:userName/order/:orderID route by put method and update a order if it exists

async function update(req: Request, res: Response) {
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

// deleting a order by request user/:userName/order/:orderID route by delete method and delete a order if exist

async function deleteOrder(req: Request, res: Response) {
  const orderID: string = req.params.orderID;
  const userName: string = req.params.userName;
  try {
    const result = await order.show(Number(orderID));
    if (result && userName === result.user_name) {
      // delete all products in this order first
      await deleteAllOrderProducts(Number(orderID), 'o');

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

// delete all products that belongs to specific order or specific product
async function deleteAllOrderProducts(
  ID: number,
  typ: 'o' | 'p'
): Promise<void> {
  try {
    const getAllProducts = await order.getProducts();
    if (getAllProducts?.length) {
      getAllProducts.forEach(async (p) => {
        // checking what for this function is called
        if (typ === 'o') {
          if (p.o_id == ID) {
            await order.deleteOrderProduct(p.id as number);
          }
        }
        if (typ === 'p') {
          if (p.p_id == ID) {
            await order.deleteOrderProduct(p.id as number);
          }
        }
      });
    }
  } catch (error) {
    throw new Error(`ERR!: ${error}`);
  }
}

export default {
  create,
  index,
  getOrder,
  update,
  deleteOrder,
  deleteAllOrderProducts,
};
