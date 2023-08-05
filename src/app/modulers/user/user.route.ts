import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();


// router.get('/:id', auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER), UserController.getSingleUser);
// router.patch(
//     '/:id', 
//     auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER),
//     validateRequest(UserValidation.updateUserZodSchema),
//     UserController.updateUser
// );
router.delete('/:id',auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER), UserController.deleteUser);

router.get('/', auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER), UserController.getAllUsers);

router.get('/my-profile/',auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER),UserController.getMyProfile);
router.patch('/my-profile/',auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER),UserController.updateMyProfile);


export const UserRoutes = router;
