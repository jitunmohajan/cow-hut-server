import { Model, Types } from 'mongoose';

export type ICowLocation = 'Dhaka'
| 'Chattogram'
| 'Barishal'
| 'Rajshahi'
| 'Sylhet'
| 'Comilla'
| 'Rangpur'
| 'Mymensingh';

export type ICowBreed = 'Brahman'
| 'Nellore'
| 'Sahiwal'
| 'Gir'
| 'Indigenous'
| 'Tharparkar'
| 'Kankrej';

export type ICowLabel = 'for sale'| 'sold out';

export type ICowCategory = 'Dairy'| 'Beef' | 'DualPurpose';

export type ICow = {
  id: string;
  name:string;
  age:number;
  price:number;
  location:ICowLocation;
  breed:ICowBreed;
  weight:number;
  label:ICowLabel;
  category: ICowCategory;
  seller:Types.ObjectId;

};

export type CowModel = Model<ICow>;

export type ICowFilters = {
  searchTerm: string;
  location:string;
  maxPrice:number;
  minPrice:number;
};
