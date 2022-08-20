import { users } from '../../../../models/users';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// getting all users by request /user route by get method and return a all users

export default async function index(req: Request, res: Response) {
  const user = new users();
  try {
    const result = await user.index();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't create users` });
  }
}
