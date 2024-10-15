import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const blacklistedTokens: Set<string> = new Set();

interface CustomRequest extends Request {
  user: string | JwtPayload;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log("Incoming request headers:", req.headers);

  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    res.status(401).json({ error: "No token provided, authorization denied" });
    return;
  }

  if (blacklistedTokens.has(token)) {
    res.status(401).json({ error: "Token is blacklisted" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Token is not valid" });
  }
};

export const blacklistToken = (token: string): void => {
  blacklistedTokens.add(token);
};
