import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IAdmin, AdminModel } from './admin.interface';
const AdminSchema = new Schema<IAdmin>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin'],
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<
  IAdmin,
  'phoneNumber'|'password'
> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { _id:1, phoneNumber: 1, password: 1, role: 1}
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
AdminSchema.pre('save', async function (next) {
  // hashing user password
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('admin', AdminSchema);
