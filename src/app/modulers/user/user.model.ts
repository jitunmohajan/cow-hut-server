import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.inteface';
import bcrypt from 'bcrypt';
import config from '../../../config';
const UserSchema = new Schema<IUser>(
  {
   
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ['seller', 'buyer'],
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
      unique: true
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<
  IUser,
  'phoneNumber'|'password' | 'role'
> | null> {
  return await User.findOne(
    { phoneNumber },
    { _id:1, phoneNumber: 1, password: 1, role: 1}
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
