import { Model } from 'mongoose';
import { ENUM_ADMIN_ROLE } from '../../../enums/user';

export type IAdminRoles = 'admin';

export type IAdmin = {
    password: string;
    role: IAdminRoles;
    name: {
        firstName: string;
        lastName: string;
    };
    phoneNumber: string;
    address: string;
};

export type ILoginAdmin = {
    phoneNumber: string;
    password: string;
};
  
export type ILoginAdminResponse = {
    accessToken: string;
    refreshToken?: string;
};
  
export type IRefreshTokenResponse = {
    accessToken: string;
};
  
export type IVerifiedLoginAdmin = {
    userId: string;
    role: ENUM_ADMIN_ROLE;
};

export type UserModel = {
    isUserExist(
      // eslint-disable-next-line no-unused-vars
      phoneNumber: string
    ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role'>>;

    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
      ): Promise<boolean>;
    
  } & Model<IAdmin>;

// export type AdminModel = Model<IAdmin>;
