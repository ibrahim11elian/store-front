import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

// middleware for checking if user is authinticated or not
export default function jwtAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, TOKEN_SECRET as string);

    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
}
