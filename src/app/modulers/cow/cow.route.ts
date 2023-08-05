import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cow.validation';
import { cowController } from './cow.controller';
import { ENUM_ADMIN_ROLE, ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(cowValidation.createCowZodSchema),
  cowController.createCow
);
router.get('/:id',
  auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER,ENUM_ADMIN_ROLE.ADMIN), 
  cowController.getSingleCow
);
router.delete('/:id',auth(ENUM_USER_ROLE.SELLER), cowController.deleteCow);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(cowValidation.updateCowZodSchema), 
  cowController.updateCow
);
router.get('/',
  auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER,ENUM_ADMIN_ROLE.ADMIN), 
  cowController.getAllCows
);

export const CowRoutes = router;
