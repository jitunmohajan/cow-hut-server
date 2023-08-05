import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse, IUser } from './user.inteface';
import { UserService } from './user.service';
import config from '../../../config';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    if (userData.income == null) {
      userData.income = 0;
    }
    const result = await UserService.createUser(userData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users created successfully',
      data: result,
    });

    next();
  }
);


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await UserService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: result,
  });
});



const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result= await UserService.getAllUsers();

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved successfully',
      data: result
     
    });

    next();
  }
);

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User deleted successfully',
      data: result
    });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {

  const token = req.headers.authorization;
  const result = await UserService.getMyProfile(token);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const updatedData = req.body;

  const result = await UserService.updateMyProfile(token, updatedData);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result
  });
});

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile

};
