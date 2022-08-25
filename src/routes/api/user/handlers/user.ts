import { User, USER } from '../../../../models/users';
import deleteOrder from '../../order/handlers/order';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { DashboardQueries } from '../../../../services/dashboard';
import { Order } from '../../../../models/orders';

dotenv.config();

const user = new User();
// creating a new user by request /user route by post method and return a token

async function create(req: Request, res: Response) {
  const newUser: USER = req.body;

  try {
    const result = await user.show(newUser['user_name']);

    if (result) {
      res.status(400).json({ msg: `${newUser['user_name']} already exist` });
    } else {
      await user.create(newUser);
      const token = jwt.sign(
        { username: newUser['user_name'] },
        process.env.TOKEN_SECRET as string
      );

      res.status(201).json(token);
    }
  } catch (error) {
    res.status(400).json({ msg: `can't create user` });
  }
}

// getting all users by request /user route by get method and return a all users

async function index(req: Request, res: Response) {
  try {
    const result = await user.index();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get users` });
  }
}

// get a specific user by request /user/:userName route by get method and return a user if exist

async function getUser(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const dashboard = new DashboardQueries();
  try {
    const result = await user.show(userName);
    const recentPurchases = await dashboard.mostRecentPurchases(userName);
    if (result)
      res.status(200).json({ user: result, recent_purchases: recentPurchases });
    else {
      res.status(400).json({ msg: `can't find user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// updating a user by request /user/:userName route by put method and update a user if exist

async function update(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const { firstName, lastName } = req.body;

  try {
    const result = await user.show(userName);
    if (result) {
      const updated = await user.update(userName, firstName, lastName);
      res.status(201);
      res.json({ msg: `${userName} data updated`, user: updated });
    } else {
      res.status(400).json({ msg: `can't find user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// deleting a user by request /user/:userName route by delete method and delete a user and all his orders if exist

const order = new Order();

async function deleteUser(req: Request, res: Response) {
  const userName: string = req.params.userName;

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
async function deleteAllOrders(userName: string): Promise<void> {
  try {
    const getAllOrders = await order.index();
    if (getAllOrders?.length) {
      getAllOrders.forEach(async (o) => {
        // checking what for this function is called
        if (o.user_name === userName) {
          await deleteOrder.deleteAllOrderProducts(o.id as number, 'o');
          await order.delete(o.id as number);
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
  getUser,
  update,
  deleteUser,
  deleteAllOrders,
};
