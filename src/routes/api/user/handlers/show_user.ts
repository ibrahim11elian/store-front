import { User } from '../../../../models/users';
import { Request, Response } from 'express';
import { DashboardQueries } from '../../../../services/dashboard';

// get a specific user by request /user/:userName route by get method and return a user if exist

export default async function getUser(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const user = new User();
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
