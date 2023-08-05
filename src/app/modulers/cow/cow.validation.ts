import { z } from 'zod';
import { cowBreed, cowCategory, cowLabel, cowLocation } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'seller is required ',
    }),
    age: z.number({
      required_error: 'age is required ',
    }),
    price: z.number({
      required_error: 'seller is required ',
    }),
    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: 'Fill with correct location',
    }),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: 'Fill with correct breed',
    }),
    weight: z.number({
      required_error: 'weight is required ',
    }),
    label: z.enum([...cowLabel] as [string, ...string[]], {
      required_error: 'Fill with correct label',
    }),
    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: 'Fill with correct label',
    }),
    seller: z.string({
      required_error: 'seller is required ',
    }),
  }),
});

const updateCowZodSchema = z
  .object({
    body: z.object({
      name: z.string({
        required_error: 'seller is required ',
      })
       .optional(),
    }),
  });

export const cowValidation = {
  createCowZodSchema,
  updateCowZodSchema
};
