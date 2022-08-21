import { User } from '../../../../models/users';
import { Request, Response } from 'express';

// getting all users by request /user route by get method and return a all users

export default async function index(req: Request, res: Response) {
  const user = new User();
  try {
    const result = await user.index();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get users` });
  }
}
