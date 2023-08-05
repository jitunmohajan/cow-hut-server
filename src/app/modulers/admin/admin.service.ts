import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const   createAdmin= async (payload: IAdmin): Promise<IAdmin> => {
  const result = await Admin.create(payload);
  return result;
};

const loginAdmin = async (payload: ILoginAdmin): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;
 

  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { phoneNumber: mobileNumber, role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { mobileNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { mobileNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin
};
