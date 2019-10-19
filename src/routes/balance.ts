import { Router } from 'express';

import BalanceController from '../controllers/BalanceController';
import findUser from '../middlewares/findUser';

class BalanceRoutes {
  constructor(routes: Router) {
    routes.get('/balance/:id', findUser, BalanceController.getBalance);
    routes.put('/balance/:id', findUser, BalanceController.updateBalance);
  }
}

export default BalanceRoutes;
