import { Request, Response } from 'express';
import { DashboardQueries } from '../../../../services/dashboard';

const dash = new DashboardQueries();

//   return carrunt active order by user
async function carruntOrderByUser(req: Request, res: Response) {
  const userName: string = req.params.userName;

  try {
    const result = await dash.carruntOrder(userName);
    if (result.length) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ msg: `there is no active orders for user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ err: 'unable to retrive orders' });
  }
}

//   return 5 most popular products ordered
async function getPopularProducts(req: Request, res: Response) {
  try {
    const result = await dash.popularProducts();
    if (result.length) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: `there is no popular products` });
    }
  } catch (error) {
    res.status(400).json({ err: 'unable to retrive products' });
  }
}

// return all completed order by user
async function completedOrderByUser(req: Request, res: Response) {
  const userName: string = req.params.userName;

  try {
    const result = await dash.completedOrderByUser(userName);
    if (result.length) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ msg: `there is no completed orders for user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ err: 'unable to retrive orders' });
  }
}

export default {
  carruntOrderByUser,
  completedOrderByUser,
  getPopularProducts,
};
