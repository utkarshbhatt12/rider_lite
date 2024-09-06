import { RiderLocations } from 'db/sequelize/models/riderLocations.model';
import { type Request, type Response } from 'express';
import { Op, Sequelize } from 'sequelize';

import type {
  ServiceabilityRequestQuery,
  ServiceabilityResponse,
  // CancelOrderRequestBody,
  // PlaceOrderRequestBody,
  // RiderLocationRequestBody,
  ClientAttrs,
} from 'types';

export const serviceabilityController = async (
  req: Request<null, null, null, ServiceabilityRequestQuery>,
  res: Response<ServiceabilityResponse, ClientAttrs>,
) => {
  try {
    const maxDistanceInMeters = 5000;
    const MAX_RIDERS_TO_GET = 10;
    // const { pickupLatitude, pickupLongitude } = req.query;
    const pickupLatitude = Number(req.query.pickupLatitude);
    const pickupLongitude = Number(req.query.pickupLongitude);

    const availableRiders = await RiderLocations.findAll({
      attributes: [
        'riderId',
        [
          Sequelize.fn(
            'ST_DistanceSphere',
            Sequelize.col('location'),
            Sequelize.fn('ST_MakePoint', pickupLongitude, pickupLatitude),
          ),
          'distance',
        ],
      ],
      where: {
        status: 'online',
        [Op.and]: Sequelize.where(
          Sequelize.fn(
            'ST_DWithin',
            Sequelize.col('location'),
            Sequelize.fn('ST_MakePoint', pickupLongitude, pickupLatitude),
            maxDistanceInMeters,
          ),
          true,
        ),
      },
      order: [[Sequelize.literal('distance'), 'ASC']],
      limit: MAX_RIDERS_TO_GET,
    });

    res.send({
      message: 'ok',
      data: {
        eta: -1,
        serviceable: availableRiders!.length > 0,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: 'Something went wrong',
      data: {},
    });
  }
};

export const placeOrderController = (_req: Request, res: Response) => {
  res.send({});
};

export const cancelOrderController = (_req: Request, res: Response) => {
  res.send({});
};

export const getRiderLocationController = (_req: Request, res: Response) => {
  res.send({});
};

export const putRiderLocationController = (_req: Request, res: Response) => {
  res.send({});
};
