import { Request, Response } from 'express';
import { DashboardQueries } from '../../../../services/dashboard';

export default async function completedOrderByUser(
  req: Request,
  res: Response
) {
  const userName: string = req.params.userName;
  const dash = new DashboardQueries();

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
