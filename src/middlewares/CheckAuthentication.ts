import { Request, Response, NextFunction } from 'express';

import { JwtPayload, verify } from 'jsonwebtoken';

import authConfig from 'config/auth';

import AppError from 'models/AppError';

function CheckAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authenticationHeader = req.headers.authorization;

  if (!authenticationHeader) {
    throw new AppError('Bearer Token is missing', 401);
  }

  const [, token] = authenticationHeader.split(' ');

  try {
    const verifyToken = verify(token, authConfig.jwt.secret ?? '');

    const { sub } = verifyToken as JwtPayload;

    req.user = {
      id: sub ?? ''
    };

    return next();
  } catch {
    throw new AppError('JWT Token is missing');
  }
}

export default CheckAuthentication;
