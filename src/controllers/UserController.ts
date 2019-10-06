import { Request, Response } from 'express';

import User, { UserInterface } from '../schemas/User';

class UserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name,
      bio,
      password,
      oldPassword,
      id,
    } = req.body;

    if ((password && !oldPassword) || (!password && oldPassword)) return res.status(400).json({ message: 'Preencha sua antiga senha e a nova' });

    // ! TODO: AUTH
    if (!id) return res.status(400).json({ message: 'ID do usuário é obrigatório' });

    User.findById(id, async (err, user) => {
      if (err) return res.status(500).json({ message: 'Erro ao atualizar usuário' });

      if (!user) return res.status(400).json({ message: 'Usuário náo existe' });

      if (oldPassword && !await user.comparePassword(oldPassword)) {
        return res.status(400).json({ message: 'Senha antiga incorreta' });
      }

      if (name) user.name = name;
      if (bio) user.bio = bio;
      if (password && oldPassword) user.password = password;

      const updatedUser = await user.save();

      return res.json(updatedUser);
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
    }

    User.find({ email }, (err, user: UserInterface[]) => {
      if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário' });

      if (user.length) {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
    });

    const user = await User.create(req.body);

    return res.json({ user });
  }
}

export default new UserController();
