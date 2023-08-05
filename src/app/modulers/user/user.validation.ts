import { z } from 'zod';
import { userRoles } from './user.constant';

const createuserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'password is required ',
    }),
    role: z.enum([...userRoles] as [string, ...string[]], {
      required_error: 'User should be buyer or seller',
    }),
    password: z.string({
      required_error: 'password is required ',
    }),
    budget: z.number({
      required_error: 'budget is required ',
    }),
    
  }),
});

const updateUserZodSchema = z
  .object({
    body: z.object({
      phoneNumber: z.string({
        required_error: 'password is required ',
      }).optional(),
      role: z.enum([...userRoles] as [string, ...string[]], {
        required_error: 'User should be buyer or seller',
      }).optional(),
      password: z.string({
        required_error: 'password is required ',
      }).optional(),
      budget: z.number({
        required_error: 'budget is required ',
      }).optional(),
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

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});


export const UserValidation = {
  createuserZodSchema,
  updateUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema
};
