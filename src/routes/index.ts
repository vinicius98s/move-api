import { Router } from 'express';

import BalanceController from '../controllers/BalanceController';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';

import getUserData from '../middlewares/getUserData';
import auth from '../middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', auth, getUserData, UserController.index);
routes.put('/users', auth, getUserData, UserController.update);

routes.post('/sessions', SessionController.store);

routes.get('/balance', auth, getUserData, BalanceController.getBalance);
routes.get('/balance/history', auth, getUserData, BalanceController.getBalanceHistory);
routes.put('/balance', auth, getUserData, BalanceController.updateBalance);

export default routes;
