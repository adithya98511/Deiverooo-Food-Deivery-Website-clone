import { Request, Response, NextFunction } from "express";

interface User {
  role: string;
}

interface CustomRequest extends Request {
  user: { user: User };
}

export const roleMiddleware = (requiredRole: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = user.user.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }

    next();
  };
};
