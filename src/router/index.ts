import { Router } from 'express';

import {
  serviceabilityController,
  placeOrderController,
  cancelOrderController,
  getRiderLocationController,
  putRiderLocationController,
} from 'controllers';
// import authMiddleware from 'middlewares/auth';

const router = Router();

router
  .get('/serviceability', serviceabilityController)
  .post('/placeOrder', placeOrderController)
  .put('/cancelOrder/:orderId', cancelOrderController)
  .get('/riderLocation/:riderId', getRiderLocationController)
  .put('/riderLocation', putRiderLocationController);

export default router;
