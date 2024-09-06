import {
  serviceabilityController,
  placeOrderController,
  cancelOrderController,
  getRiderLocationController,
  putRiderLocationController,
} from 'controllers';
import { Router } from 'express';

export default Router()
  .get('/serviceability', serviceabilityController)
  .post('/placeOrder', placeOrderController)
  .put('/cancelOrder/:orderId', cancelOrderController)
  .get('/riderLocation/:riderId', getRiderLocationController)
  .put('/riderLocation', putRiderLocationController);
