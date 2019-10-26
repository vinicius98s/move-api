import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../schemas/User';

import authConfig from '../config/auth';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Preencha todos os campos' });

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);

      const { _id, name } = user;

      if (isPasswordCorrect) {
        return res.json({
          user: {
            _id,
            email,
            name,
          },
          token: jwt.sign({ _id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      }

      return res.status(400).json({ error: 'Senha incorreta' });
    }

    return res.status(400).json({ error: 'Usuário não encontrado' });
  }
}

export default new SessionController();
