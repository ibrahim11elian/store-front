import { User } from '../../../../models/users';
import { Request, Response } from 'express';

// get a specific user by request /user/:userName route by get method and return a user if exist

export default async function getUser(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const user = new User();
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
