export type PlaceOrderRequestBody = {};

export type CancelOrderRequestBody = { orderId: string };

export type ServiceabilityRequestQuery = {
  latitude: number;
  longitude: number;
};

export type RiderLocationRequestBody = {
  riderId: number;
  latitude: number;
  longitude: number;
  bearing: number;
  timestamp: number;
};
