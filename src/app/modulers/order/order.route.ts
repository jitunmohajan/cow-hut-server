import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_ADMIN_ROLE, ENUM_USER_ROLE } from '../../../enums/user';



const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.BUYER),
  validateRequest(orderValidation.createOrderZodSchema),
  orderController.createOrder
);

router.get('/',auth(ENUM_USER_ROLE.BUYER,ENUM_ADMIN_ROLE.ADMIN), orderController.getAllOrders);

// router.get('/:id',
//   auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER,ENUM_ADMIN_ROLE.ADMIN), 
//   orderController.getSingleOrder
// );

export const OrderRoutes = router;
