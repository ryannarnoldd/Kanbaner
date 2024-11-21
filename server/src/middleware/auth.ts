import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;

  if (headers.authorization !== undefined) {
    const token = headers.authorization.split(' ')[1];

    const key = process.env.JWT_SECRET_KEY || 'ex';

    jwt.verify(token, key, (_err, user) => {
      try {
        req.user = user as JwtPayload;
        return next();
      }
      catch(err) {
        return res.sendStatus(402);
      }
    })
  } else {
    res.sendStatus(404);
  }
};
