import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = Router();

routes.put('/user', UserController.update);
routes.post('/user', UserController.store);

export default routes;
