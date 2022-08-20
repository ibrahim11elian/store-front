import { users } from '../../../../models/users';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// deleting a user by request /user/:userName route by delete method and delete a user if exist

export default async function deleteUser(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const user = new users();
  try {
    const result = await user.show(userName);
    if (result) {
      const deleted = await user.delete(userName);
      res.status(200).json({ msg: deleted });
    } else {
      res.status(400).json({ msg: `can't find user (${userName})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}
