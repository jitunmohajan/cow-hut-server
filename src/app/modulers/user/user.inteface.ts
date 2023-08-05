/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
export type IUserRoles = 'seller' | 'buyer';

export type IUser = {
  password: string;
  role: IUserRoles;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};



export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser>;
