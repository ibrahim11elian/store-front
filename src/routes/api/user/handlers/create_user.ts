import { User, USER } from '../../../../models/users';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// creating a new user by request /user route by post method and return a token

export default async function create(req: Request, res: Response) {
  const newUser: USER = req.body;

  const user = new User();
  try {
    const result = await user.show(newUser['user_name']);

    if (result) {
      res.status(400).json({ msg: `${newUser['user_name']} already exist` });
    } else {
      await user.create(newUser);
      const token = jwt.sign(
        { username: newUser['user_name'] },
        process.env.TOKEN_SECRET as string
      );

      res.status(201).json(token);
    }
  } catch (error) {
    res.status(400).json({ msg: `can't create user` });
  }
}
