import { Riders } from 'db/sequelize/models/riders.model';

export type ClientAttrs = {
  id: Riders['id'];
  isActive: Riders['isActive'];
  name: Riders['name'];
  phoneNumber: Riders['phoneNumber'];
  authToken: string;
  clientId: Riders['clientId'];
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

export type PutRiderLocationResponse = {
  message: string;
};
