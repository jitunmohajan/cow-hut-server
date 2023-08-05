import { Schema, model } from 'mongoose';
// import status from 'http-status';
// import ApiError from '../../../errors/ApiError';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: ['Dhaka','Chattogram','Barishal','Rajshahi','Sylhet','Comilla','Rangpur','Mymensingh'],
    },
    breed: {
      type: String,
      required: true,
      enum: ['Brahman','Nellore','Sahiwal','Gir','Indigenous','Tharparkar','Kankrej'],
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ['for sale', 'sold out'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Dairy', 'Beef', 'DualPurpose'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
  
);



export const Cow = model<ICow, CowModel>('Cow', cowSchema);
