import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

// middleware for checking if user is authorized or not
export default function jwtAuthorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userName = req.params.userName;
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    const decoded = jwt.verify(token, TOKEN_SECRET as string) as JwtPayload;
    if (decoded['username'] !== userName) {
      res.status(401).json('User name does not match!');
    }
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
}
