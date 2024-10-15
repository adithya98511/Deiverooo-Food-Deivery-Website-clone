import { User } from '../models/user'; 

declare global {
  namespace Express {
    interface Request {
      user : User // Add the `user` property with the type `User`
    }
  }
}
