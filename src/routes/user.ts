import { Router } from 'express';

import UserController from '../controllers/UserController';

class UserRoutes {
  constructor(routes: Router) {
    routes.get('/user/:id', UserController.index);
    routes.put('/user/:id', UserController.update);
    routes.post('/user', UserController.store);
  }
}

export default UserRoutes;
