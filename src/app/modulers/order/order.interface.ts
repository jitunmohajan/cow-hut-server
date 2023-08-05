import { Model, Types } from 'mongoose';
import { ICow } from '../cow/cow.interface';
import { IUser } from '../user/user.inteface';

export type IOrder = {
  cow:Types.ObjectId | ICow;
  buyer:Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder>;

