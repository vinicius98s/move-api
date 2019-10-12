import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = Router();

routes.get('/user/:id', UserController.index);
routes.put('/user/:id', UserController.update);
routes.post('/user', UserController.store);

export default routes;
