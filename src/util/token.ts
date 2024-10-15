import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { OAuth2Client } from 'google-auth-library';
import User  from '../models/userModel'; 
import dotenv from 'dotenv';

dotenv.config();

// Function to generate an access token
export const generateAccessToken = (user: any): string => {
  return jwt.sign(
    { user: user, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' } 
  );
};

// Function to generate a refresh token
export const generateRefreshToken = (user: any): string => {
  return jwt.sign(
    { user: user, email: user.email },
    process.env.REFRESH_TOKEN_SECRET as string, // Use environment variable for refresh token secret
    { expiresIn: '2h' } // Refresh token expires in 2 hours
  );
};

//Function to refresh the access token
export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { token }: { token: string } = req.body;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken(user);
    console.log('-------------------------new access token-------------------------------------- : ', accessToken);

    return res.json({ access_token: accessToken });
  });
};

// Google Sign-In API
// export const googleSignInAuth = async (req: Request, res: Response): Promise<Response> => {
//   const { token }: { token: string } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
// //     const payload = ticket.getPayload();

// //     if (!payload) {
// //       return res.status(400).json({ error: 'Invalid token payload' });
// //     }

//     // Check if user exists in the database
//     let user = await User.findOne({ where: { email: payload.email } });
//     if (!user) {
//       user = await User.create({
//         email: payload.email as string,
//         role: 'user', // Default role, adjust as necessary
//         password: '', // Handle this field appropriately in your application
//       });
//     }

//     console.log('google user :', user);

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     return res.json({
//       accessToken,
//       refreshToken,
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (error: any) {
//     return res.status(400).json({ error: 'Invalid token' });
//   }
// };
