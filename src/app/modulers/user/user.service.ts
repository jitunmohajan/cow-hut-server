import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse, IUser } from './user.inteface';
import { User } from './user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id:userId,phoneNumber: mobileNumber, role } = isUserExist;

  // console.log('my use id is',userId);

  const accessToken = jwtHelpers.createToken(
    { userId, phoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId,mobileNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { mobileNumber } = verifiedToken;


  const isUserExist = await User.isUserExist(mobileNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const { _id:userId,phoneNumber:mobile, role } = isUserExist;

  const newAccessToken = jwtHelpers.createToken(
    {
      id: userId,
      phoneNumber: mobile,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const getSingleUser = async (
  id: string
): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

export const getAllUsers = async():Promise<IUser[]> =>{
  return User.find({});
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
 
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (
  id: string
): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getMyProfile = async (token:string): Promise<IUser | null> => {
  let verifiedUser = null;
  try {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifiedUser;
  const result = await User.findById(userId);
  return result;
};

const updateMyProfile = async (
  token:string,
  payload: Partial<IUser>
): Promise<IUser | null> => {

  let verifiedUser = null;
  try {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifiedUser;
 
  const result = await User.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
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
