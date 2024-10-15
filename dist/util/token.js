"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Function to generate an access token
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ user: user, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
};
exports.generateAccessToken = generateAccessToken;
// Function to generate a refresh token
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ user: user, email: user.email }, process.env.REFRESH_TOKEN_SECRET, // Use environment variable for refresh token secret
    { expiresIn: '2h' } // Refresh token expires in 2 hours
    );
};
exports.generateRefreshToken = generateRefreshToken;
//Function to refresh the access token
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        const accessToken = (0, exports.generateAccessToken)(user);
        console.log('-------------------------new access token-------------------------------------- : ', accessToken);
        return res.json({ access_token: accessToken });
    });
});
exports.refreshToken = refreshToken;
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
