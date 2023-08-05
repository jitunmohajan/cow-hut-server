import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CowService } from './cow.service';
import { ICow } from './cow.interface';


const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    if (userData.income == null) {
      userData.income = 0;
    }
    const result = await CowService.createCow(userData);

    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow created successfully',
      data: result
    });

    next();
  }
);

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully',
    data: result
  });
});



// ______________________________________________________________________
const getAllCows = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm','location','maxPrice','minPrice']);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowService.getAllCows(
      filters,
      paginationOptions
    );

    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows Retrived successfully',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

// ________________________________________________________________

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CowService.updateCow(id, updatedData);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow updated successfully',
    data: result
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.deleteCow(id);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow deleted successfully',
      data: result
    });
});

export const cowController = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
