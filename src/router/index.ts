import { Router, type Request } from 'express';
import type {
  CancelOrderRequestBody,
  PlaceOrderRequestBody,
  RiderLocationRequestBody,
  ServiceabilityRequestQuery,
} from 'types';

const router = Router();

router.get(
  '/serviceability',
  (
    req: Request<
      null,
      { message: string; data: { serviceable: boolean } },
      ServiceabilityRequestQuery,
      null
    >,
    res,
  ) => {
    res.send({
      data: { serviceable: true },
      message: 'ok',
    });
  },
);

router.post('/placeOrder', (req: Request<PlaceOrderRequestBody>, res) => {
  res.send({ message: 'Order placed successfully' });
});

router.put(
  '/cancelOrder/:orderId',
  (_req: Request<CancelOrderRequestBody>, res) => {
    res.send({ message: 'Order cancelled successfully' });
  },
);

router.get(
  '/riderLocation/:riderId',
  (req: Request<{ riderId: string }>, res) => {
    res.send({
      message: 'ok',
      data: {
        timestamp: new Date(),
        bearing: 10,
        riderId: req.params.riderId,
        coordinates: { latitude: 10, longitude: 10 },
      },
    });
  },
);

router.post('/riderLocation', (req: Request<RiderLocationRequestBody>, res) => {
  res.send({ message: 'ok' });
});

export default router;
