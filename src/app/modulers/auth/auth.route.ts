import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createuserZodSchema),
  UserController.createUser
);
router.post(
  '/login',
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
);



export const AuthRoutes = router;
