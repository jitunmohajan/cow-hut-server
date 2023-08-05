import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import { IOrder } from './order.interface';

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
   
    const result = await OrderService.createOrder(userData);

    sendResponse<IOrder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order created successfully',
      data: result
    });

    next();
  }
);

const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization;

    const result= await OrderService.getAllOrders(token);
    sendResponse<IOrder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Orders retrieved successfully',
      data: result
     
    });

    next();
  }
);

// const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await OrderService.getSingleOrder(id);

//   sendResponse<IOrder>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order retrieved successfully',
//     data: result
//   });
// });

export const orderController = {
  createOrder,
  getAllOrders,
  // getSingleOrder
 
};
