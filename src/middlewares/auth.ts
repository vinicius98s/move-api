import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { promisify } from 'util';

import authConfig from '../config/auth';

interface DecodedUserInfo {
  _id: string,
  iat: number,
  exp: number,
}

export default async function (
  req:Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token de autenticação é obrigatório' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const decodedUserInfo = await promisify(jwt.verify)(
      token,
      authConfig.secret,
    ) as DecodedUserInfo;

    const { _id } = decodedUserInfo;

    req.userId = _id;
  } catch (err) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }

  return next();
}
