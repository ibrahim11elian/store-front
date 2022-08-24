import { User } from '../../../../models/users';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// updating a user by request /user/:userName route by put method and update a user if exist

export default async function update(req: Request, res: Response) {
  const userName: string = req.params.userName;
  const { firstName, lastName } = req.body;

  const user = new User();
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
