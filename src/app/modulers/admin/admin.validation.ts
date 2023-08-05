import { z } from 'zod';


const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required ',
    }),
    role: z.string({
      required_error: 'Role is required ',
    }),
    name: z.object({
        firstName: z.string(),
        lastName: z.string()
    }),
    phoneNumber: z.string({
      required_error: 'Phone Number is required ',
    }),
    address: z.string({
      required_error: 'Address is required ',
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});


export const adminValidation = {
    createAdminZodSchema,
    loginZodSchema
};
