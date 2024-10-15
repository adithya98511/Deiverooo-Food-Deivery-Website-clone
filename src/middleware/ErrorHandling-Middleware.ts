import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ERROR_MESSAGES } from '../constants/error_constants';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERR;
  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};

export default errorHandler;
