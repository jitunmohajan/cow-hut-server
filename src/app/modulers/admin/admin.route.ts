import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(adminValidation.loginZodSchema),
  AdminController.loginAdmin
);


export const AdminRoutes = router;
