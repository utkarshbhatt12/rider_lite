export type ClientAttrs = {
  id: number;
  isActive: boolean;
  name: string;
  phoneNumber: string;
  authToken: string;
};

export type PlaceOrderRequestBody = {};

export type CancelOrderRequestBody = { orderId: string };

export type ServiceabilityRequestQuery = {
  pickupLatitude: number;
  pickupLongitude: number;
  dropLatitude: number;
  dropLongitude: number;
  itemSize: 'small' | 'medium' | 'large';
};

export type ServiceabilityResponse = {
  message: string;
  data: Partial<{ serviceable: boolean; eta: number }>;
};

export type RiderLocationRequestBody = {
  riderId: number;
  latitude: number;
  longitude: number;
  bearing: number;
  timestamp: number;
};
