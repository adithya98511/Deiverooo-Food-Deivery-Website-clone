"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.resetPassword = exports.resetPasswordPage = exports.forgotPassword = exports.getForgotPassword = exports.postLogin = exports.postSignup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const sequelize_1 = require("sequelize");
const auth_middleware_1 = require("../middleware/auth-middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const token = __importStar(require("../util/token"));
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: "guqs vhoi efaj qngp",
    },
});
const postSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, password_re } = req.body;
    try {
        console.log(`Checking email: ${email}`);
        const existingUser = yield userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "This email is already registered." });
        }
        if (password !== password_re) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = yield userModel_1.default.create({
            email: email,
            password: hashedPassword,
        });
        user.save();
        const mailOptions = {
            from: 'adithya.intern.emg@gmail.com',
            to: email,
            subject: 'Welcome to Deliveroo!',
            text: `Hello ${email},\n\nThank you for registering at Deliveroo. We're excited to have you on board!\n\nBest regards,\nThe Deliveroo Team`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postSignup = postSignup;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'No user found with this email' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        if (!user.id) {
            throw new Error('User ID is not defined.');
        }
        const accessToken = token.generateAccessToken(user);
        console.log('access token: ', accessToken);
        const refreshToken = token.generateRefreshToken(user);
        return res.status(200).json({
            message: 'Successfully logged in',
            access_token: accessToken,
            refresh_token: refreshToken,
            userId: user.id.toString(),
            userRole: user.role,
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.postLogin = postLogin;
const getForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('Forgot password');
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getForgotPassword = getForgotPassword;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'No user found with this email' });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        yield user.save();
        const mailOptions = {
            to: email,
            from: 'adithya.intern.emg@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested to reset your password.\n\n
             Please click on the following link, or paste it into your browser, to complete the process:\n\n
             http://localhost:${process.env.PORT}/resetPage/${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        yield transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Password reset link sent to your email' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.forgotPassword = forgotPassword;
const resetPasswordPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const user = yield userModel_1.default.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [sequelize_1.Op.gt]: new Date() },
            },
        });
        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }
        // Token is valid, redirect to the password reset page
        res.send("Change password"); //res.redirect(`http://localhost:8080/reset-password/${token}`);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.resetPasswordPage = resetPasswordPage;
// POST route to handle password reset
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    try {
        // Find user by resetToken and check if token hasn't expired
        const user = yield userModel_1.default.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [sequelize_1.Op.gt]: Date.now() } // Check if token is still valid
            }
        });
        if (!user) {
            res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        if (user) {
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            yield user.save();
        }
        res.status(200).json({ message: 'Password has been successfully updated' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error });
    }
});
exports.resetPassword = resetPassword;
//logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        (0, auth_middleware_1.blacklistToken)(token);
    }
    res.status(200).json({ message: 'Logged out successfully' });
});
exports.logout = logout;
