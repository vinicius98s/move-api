import { Response, Request } from 'express';

class BalanceController {
  public async getBalance(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { balance } = req.user;

    return res.json({ balance });
  }

  public async updateBalance(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { user } = req;
    const { value } = req.body;

    if (!Number(value) || !value) {
      return res.status(400).json({ message: 'Valor inválido' });
    }

    user.balance += value;

    if (user.balance < 0) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    try {
      await user.save();

      return res.json({
        balance: user.balance,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao atualizar balanço' });
    }
  }
}

export default new BalanceController();
