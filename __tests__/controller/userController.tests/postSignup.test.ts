import { Transporter } from 'nodemailer';
// import { Request, Response } from 'express';
// import { postSignup } from '../../../src/controllers/userController'; 
// import User from '../../../src/models/userModel'; 
// import bcrypt from 'bcryptjs';

// // Mock the entire User model
// jest.mock('../../../src/models/userModel');
// jest.mock('bcryptjs');

// describe('postSignup', () => {
//     let req: Partial<Request>;
//     let res: Partial<Response>;

//     beforeEach(() => {
//         res = {
//             status: jest.fn().mockReturnValue(res), // chaining
//             json: jest.fn(),
//             send: jest.fn(),
//         };
//     });

//     it('should return 400 if email is already registered', async () => {
//         req = {
//             body: {
//                 email: 'test@example.com',
//                 password: 'password123',
//                 password_re: 'password123',
//             },
//         };

//         (User.findOne as jest.Mock).mockResolvedValueOnce({ id: 1, email: 'test@example.com' });

//         await postSignup(req as Request, res as Response); // Cast to Request and Response

//         expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ error: "This email is already registered." });
//     });

//     it('should return 400 if passwords do not match', async () => {
//         req = {
//             body: {
//                 email: 'test@example.com',
//                 password: 'password123',
//                 password_re: 'password321',
//             },
//         };

//         await postSignup(req as Request, res as Response);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ error: "Passwords do not match" });
//     });

//     it('should return 201 if user is created successfully', async () => {
//         req = {
//             body: {
//                 email: 'test@example.com',
//                 password: 'password123',
//                 password_re: 'password123',
//             },
//         };

//         (User.findOne as jest.Mock).mockResolvedValueOnce(null); // No existing user
//         (User.create as jest.Mock).mockResolvedValueOnce({ id: 2, email: 'test@example.com' }); // Mock user creation

//         await postSignup(req as Request, res as Response);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User created successfully' }));
//     });

//     it('should return 500 if there is an internal server error', async () => {
//         (User.create as jest.Mock).mockImplementationOnce(() => { throw new Error('Internal server error'); });

//         req = {
//             body: {
//                 email: 'test@example.com',
//                 password: 'password123',
//                 password_re: 'password123',
//             },
//         };

//         await postSignup(req as Request, res as Response);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
//     });
// });


import { Request, Response } from 'express';
import { postSignup } from '../../../src/controllers/userController';
import User from '../../../src/models/userModel';
import {transporter} from "../../../src/controllers/userController"
jest.mock('../../../src/models/userModel');

describe('postSignup', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        password_re: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if email is already registered', async () => {
    // Mock findOne to return an existing user
    (User.findOne as jest.Mock).mockResolvedValueOnce(true);
    
    await postSignup(req as Request, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'This email is already registered.' });
  });

  it('should return 400 if passwords do not match', async () => {
    req.body.password_re = 'differentPassword';
    
    await postSignup(req as Request, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Passwords do not match' });
  });

//   it('should return 201 if user is created successfully', async () => {
//     (User.findOne as jest.Mock).mockResolvedValueOnce(null);
//     (User.create as jest.Mock).mockResolvedValueOnce({ email: req.body.email, password: 'hashedPassword' }); // Mock user creation

//     await postSignup(req as Request, res as Response);
    
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
// });
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

it('should return 201 if user is created successfully and send a welcome email', async () => {
  // Mock findOne to simulate that no user exists with the provided email
  (User.findOne as jest.Mock).mockResolvedValueOnce(null);
  // Mock User.create to simulate successful user creation
  const mockUser = { email: req.body.email, password: 'hashedPassword' };
  (User.create as jest.Mock).mockResolvedValueOnce(mockUser);
  // Mock the transporter.sendMail function
  const sendMailMock = jest.fn();
  transporter.sendMail = sendMailMock;
  // Call the postSignup function
  await postSignup(req as Request, res as Response);
  // Assert that the response status is 201 (Created)
  expect(res.status).toHaveBeenCalledWith(201);
  // Assert that the response contains the success message and user object
  expect(res.json).toHaveBeenCalledWith({
    message: 'User created successfully',
    user: mockUser,
  });
  // Assert that the email was sent
  expect(sendMailMock).toHaveBeenCalledWith({
    from: 'adithya.intern.emg@gmail.com',
    to: req.body.email,
    subject: 'Welcome to Deliveroo!',
    text: `Hello ${req.body.email},\n\nThank you for registering at Deliveroo. We're excited to have you on board!\n\nBest regards,\nThe Deliveroo Team`,
  });
  // Optionally, you can assert that sendMail was called exactly once
  expect(sendMailMock).toHaveBeenCalledTimes(1);
});
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
 

it('should return 500 if there is an internal server error', async () => {
    (User.findOne as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await postSignup(req as Request, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
