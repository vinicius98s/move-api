import { Response, Request } from 'express';

import { UserInterface } from '../schemas/User';

class BalanceController {
  public async getBalance(
    req: Request & { user: UserInterface },
    res: Response,
  ): Promise<Response> {
    const { balance } = req.user;

    return res.json({ balance });
  }

  public async addToBalance(
    req: Request & { user: UserInterface },
    res: Response,
  ): Promise<Response> {
    const { user } = req;
    const { value } = req.body;

    if (!Number(value) && value < 1) {
      return res.status(400).json({ message: 'Valor inválido' });
    }

    user.balance += value;

    await user.save();

    return res.json(user);
  }
}

export default new BalanceController();
