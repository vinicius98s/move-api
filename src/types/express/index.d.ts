import { UserInterface } from '../../schemas/User';

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}
