import { Request, Response, NextFunction } from 'express';

import User, { UserInterface } from '../schemas/User';

export default async function (
  req: Request & { user: UserInterface },
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      req.user = user;
    }

    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }
}
