import User from "../models/userModel";
import {Op} from "sequelize"
import { Request, Response } from 'express';
import { blacklistToken } from "../middleware/auth-middleware";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer , {Transporter} from "nodemailer";
import * as token from '../util/token';
import signup_schema from "../schema/schemas/user_schemas/signup_schema"

interface SignUpRequestBody {
  email: string;
  password: string;
  password_re: string;
}

const transporter : Transporter = nodemailer.createTransport(
  {
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: "guqs vhoi efaj qngp",  
    },
  }
);

export const postSignup = async (req: Request<{}, {}, SignUpRequestBody>, res: Response) => {
  const { email, password, password_re } = req.body;
  

  try {
    console.log(`Checking email: ${email}`);
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "This email is already registered." });
    }

    if (password !== password_re) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    
    const user = await User.create({
      email: email,
      password: hashedPassword,
    });

    user.save();

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'adithya.intern.emg@gmail.com',
      to: email,
      subject: 'Welcome to Deliveroo!',
      text: `Hello ${email},\n\nThank you for registering at Deliveroo. We're excited to have you on board!\n\nBest regards,\nThe Deliveroo Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(201).json({ message: 'User created successfully', user });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



interface LoginRequestBody {
  email: string;
  password: string;
}

export const postLogin = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    if (!user.id) {
      throw new Error('User ID is not defined.');
    }

    const accessToken: string = token.generateAccessToken(user);
    console.log('access token: ', accessToken);

    const refreshToken: string = token.generateRefreshToken(user);

    return res.status(200).json({
      message: 'Successfully logged in',
      access_token: accessToken,
      refresh_token: refreshToken,
      userId: user.id.toString(),
      userRole: user.role,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getForgotPassword = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    res.send('Forgot password');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000)
    await user.save();

    const mailOptions = {
      to: email,
      from: 'adithya.intern.emg@gmail.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to reset your password.\n\n
             Please click on the following link, or paste it into your browser, to complete the process:\n\n
             http://localhost:${process.env.PORT}/resetPage/${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};



export const resetPasswordPage = async (req: Request, res: Response): Promise<Response | void> => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    }

    // Token is valid, redirect to the password reset page
    res.send("Change password");//res.redirect(`http://localhost:8080/reset-password/${token}`);

  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// POST route to handle password reset
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user by resetToken and check if token hasn't expired
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() } // Check if token is still valid
      }
    });

    if (!user) {
      res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    if(user){
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    }
    res.status(200).json({ message: 'Password has been successfully updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error });
  }
};

//logout
export const logout = async (req: Request , res:Response):Promise<void>=>{
  const token: string | undefined = req.headers.authorization?.split(' ')[1];

  if(token){
  blacklistToken(token);
 }
 res.status(200).json({ message: 'Logged out successfully' });
}

