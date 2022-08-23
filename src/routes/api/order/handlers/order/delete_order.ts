import { Order } from '../../../../../models/orders';
import { Request, Response } from 'express';

// deleting a order by request user/:userName/order/:orderID route by delete method and delete a order if exist

const order = new Order();

export default async function deleteOrder(req: Request, res: Response) {
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
export async function deleteAllOrderProducts(
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
