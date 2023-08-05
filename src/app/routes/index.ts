import express from 'express';
import { UserRoutes } from '../modulers/user/user.route';
import { CowRoutes } from '../modulers/cow/cow.route';
import { AuthRoutes } from '../modulers/auth/auth.route';
import { OrderRoutes } from '../modulers/order/order.route';
import { AdminRoutes } from '../modulers/admin/admin.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
