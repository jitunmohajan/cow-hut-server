import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';
import { IAdmin, ILoginAdminResponse } from './admin.interface';
import config from '../../../config';


const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    
    const result = await AdminService.createAdmin(userData);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users created successfully',
      data: result,
    });

    next();
  }
);

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.loginAdmin(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin
};
