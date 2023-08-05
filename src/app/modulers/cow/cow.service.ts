import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';


const createCow = async (payload: ICow): Promise<ICow> => {

  const result = await Cow.create(payload);
  return result;
};

const getSingleCow = async (
  id: string
): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};


const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm,location,maxPrice,minPrice } = filters;

  // const cowSearchableFilters = ['location','breed','category'];
  // const andConditions = [];
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: cowSearchableFilters.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }


  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  

  // let whereCondition =andConditions.length > 0 ? { $and: andConditions } : {};
  
  // if(location){
  //   whereCondition={location: location};
  // }

  // if(maxPrice && minPrice){
  //   whereCondition={
  //     $and: [
  //       { price: { $gte: minPrice } }, // Specify the minimum price
  //       { price: { $lte: maxPrice } }  // Specify the maximum price
  //     ]
  //   }
  // }

  const orConditions= {
    $or:[
      {
        location:{
          $regex: searchTerm,
          $options:'i'
        }
      },
      {
        breed:{
          $regex: searchTerm,
          $options:'i'
        }
      },
      {
        category:{
          $regex: searchTerm,
          $options:'i'
        }
      }
    ]
  };

  const minPriceCondition={
    price: { $gte: minPrice }
  };

  const maxPriceCondition={
    price: { $lte: maxPrice }
  }

  const locationConditions={ location: location};

  // let filterConditions ={
  //   $and: [
  //     orConditions,
  //     minPriceCondition,
  //     maxiPriceCondition,
  //     locationConditions
  //   ] 
  //  };

  const filterConditions ={
    $and: [
    ] 
   };


   if(searchTerm){
    filterConditions.$and.push(orConditions);
   }
   if(location){
    filterConditions.$and.push(locationConditions);
   }
   if(minPrice){
    filterConditions.$and.push(minPriceCondition);
   }
   if(maxPrice){
    filterConditions.$and.push(maxPriceCondition);
   }

  
  const whereCondition =filterConditions.$and.length > 0 ? filterConditions : {};
  const result = await Cow.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (
  id: string
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
