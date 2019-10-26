import { Router } from 'express';

import BalanceController from '../controllers/BalanceController';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';

import getUserData from '../middlewares/getUserData';
import auth from '../middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.get('/users', getUserData, UserController.index);
routes.put('/users', getUserData, UserController.update);
routes.get('/balance', getUserData, BalanceController.getBalance);
routes.put('/balance', getUserData, BalanceController.updateBalance);

export default routes;
