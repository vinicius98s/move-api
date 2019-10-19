import { Router } from 'express';

import UserController from './controllers/UserController';
import findUser from './middlewares/findUser';
import BalanceController from './controllers/BalanceController';

const routes = Router();

routes.get('/user/:id', UserController.index);
routes.put('/user/:id', UserController.update);
routes.post('/user', UserController.store);

routes.get('/balance/:id', findUser, BalanceController.getBalance);
routes.put('/balance/:id', findUser, BalanceController.updateBalance);

export default routes;
