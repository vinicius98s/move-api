import { Router } from 'express';

import UserRoutes from './user';
import BalanceRoutes from './balance';

const routes = Router();

new UserRoutes(routes);
new BalanceRoutes(routes);

export default routes;
