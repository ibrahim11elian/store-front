import { users } from '../../../../models/users';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// get a specific user by request /user/:userName route by get method and return a user if exist

export default async function getUser(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const user = new users();
  try {
    const result = await user.show(userName);
    if (result) res.status(200).json(result);
    else {
      res.status(400).json({ msg: `can't find user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
