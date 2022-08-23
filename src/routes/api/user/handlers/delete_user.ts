import { User } from '../../../../models/users';
import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';
import { deleteAllOrderProducts } from '../../order/handlers/order/delete_order';

// deleting a user by request /user/:userName route by delete method and delete a user and all his orders if exist

const order = new Order();

export default async function deleteUser(req: Request, res: Response) {
  const userName: string = req.params.userName;

  const user = new User();

  try {
    const result = await user.show(userName);
    if (result) {
      // delete all the user orders
      await deleteAllOrders(userName);
      const deleted = await user.delete(userName);
      res.status(200).json({ msg: deleted });
    } else {
      res.status(404).json({ msg: `can't find user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// delete all orders for specific user
export async function deleteAllOrders(userName: string): Promise<void> {
  try {
    const getAllOrders = await order.index();
    if (getAllOrders?.length) {
      getAllOrders.forEach(async (o) => {
        // checking what for this function is called
        if (o.user_name === userName) {
          await deleteAllOrderProducts(o.id as number, 'o');
          await order.delete(o.id as number);
        }
      });
    }
  } catch (error) {
    throw new Error(`ERR!: ${error}`);
  }
}
