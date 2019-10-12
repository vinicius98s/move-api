import { Request, Response } from 'express';

import User from '../schemas/User';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      const { _id, name, bio, email } = user;

      return res.json({
        _id,
        name,
        bio,
        email,
      });
    }

    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, bio, password, oldPassword } = req.body;

    const { id } = req.params;

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

    if (user) {
      if (oldPassword && !(await user.comparePassword(oldPassword))) {
        return res.status(400).json({ message: 'Senha antiga incorreta' });
      }

      if (name) user.name = name;
      if (bio) user.bio = bio;
      if (password) user.password = password;

      await user.save();

      return res.json(user);
    }

    return res.status(400).json({ message: 'Usuário não encontrado' });
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
