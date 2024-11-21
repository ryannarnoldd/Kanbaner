import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Gets header authorization information.
  const authorHeader = req.headers.authorization;

  if (authorHeader) { 
    const token =  authorHeader.split(' ')[1];

    // Gets key
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey , (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

    // Gets User as Payload (str)
    req.user = user as JwtPayload;


    return next();
  });
} else {
  res.sendStatus(402);
}
};