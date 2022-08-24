import { Request, Response } from 'express';
import { DashboardQueries } from '../../../../services/dashboard';

export default async function getPopularProducts(req: Request, res: Response) {
  const dash = new DashboardQueries();

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
