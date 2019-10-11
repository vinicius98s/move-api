import { Request, Response } from 'express';

import User from '../schemas/User';

class UserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name = '',
      bio = '',
      password = '',
      oldPassword = '',
      id,
    } = req.body;

    // ! TODO: AUTH
    if (!id) {
      return res.status(400).json({ message: 'ID do usuário é obrigatório' });
    }

    if ((password && !oldPassword) || (!password && oldPassword)) {
      return res
        .status(400)
        .json({ message: 'Preencha sua antiga senha e a nova' });
    }

    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: 'Usuário não existe' });

    if (oldPassword && !await user.comparePassword(oldPassword)) {
      return res.status(400).json({ message: 'Senha antiga incorreta' });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (password) user.password = password;

    await user.save();

    return res.json(user);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Todos os campos devem ser preenchidos' });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
