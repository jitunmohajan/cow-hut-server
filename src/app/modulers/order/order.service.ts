import mongoose from 'mongoose';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';


const createOrder = async (payload: IOrder): Promise<IOrder | null>=> {
  

  const user = await User.findById(payload.buyer).lean();
  const cow = await Cow.findById(payload.cow).lean();

  // generate student id
  let newOrderAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();


    payload.user = user?._id;
    payload.cow = cow?._id;

    //array
    const newOrder = await Order.create([payload], { session });

    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    
    newOrderAllData = newOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newOrderAllData) {
    newOrderAllData = await Order.findOne({ _id: newOrderAllData.id }).populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        }
      ],
    }).populate('buyer');
  }

  return newOrderAllData;
};
export const getAllOrders = async(token:string):Promise<IOrder[] | null> =>{
  let verifiedUser = null;
  try {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId,role } = verifiedUser;

  if(role === 'buyer'){
    return await Order.find({ buyer: userId })
  }else{
    return await Order.find({})
  }
}



export const OrderService = {
  createOrder,
  getAllOrders,
};
