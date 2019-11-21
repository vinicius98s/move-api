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
    const { value, paymentType } = req.body;

    if (!Number(value) || !value) {
      return res.status(400).json({ error: 'Valor inválido' });
    }

    user.balance += value;

    if (user.balance < 0) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    user.balanceHistory = [
      ...user.balanceHistory,
      {
        value,
        paymentType: value > 0 ? paymentType : null,
        date: new Date().getTime(),
      },
    ];

    try {
      await user.save();

      return res.json({
        balance: user.balance,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar balanço' });
    }
  }

  public async getBalanceHistory(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { balanceHistory, balance } = req.user;

    return res.json({ balanceHistory, balance });
  }
}

export default new BalanceController();
