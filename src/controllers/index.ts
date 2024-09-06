import { type Request, type Response } from 'express';
import { Op, Sequelize } from 'sequelize';

import { RiderLocations } from 'db/sequelize/models/riderLocations.model';

import type {
  ServiceabilityRequestQuery,
  ServiceabilityResponse,
  // CancelOrderRequestBody,
  // PlaceOrderRequestBody,
  // RiderLocationRequestBody,
  PutRiderLocationResponse,
  ClientAttrs,
} from 'types';

/**
 * Handles serviceability requests by finding available riders within a certain distance.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @return {Promise<void>} A promise that resolves when the response has been sent.
 */
export const serviceabilityController = async (
  req: Request<null, null, null, ServiceabilityRequestQuery>,
  res: Response<ServiceabilityResponse, ClientAttrs>,
): Promise<void> => {
  try {
    const maxDistanceInMeters = 5000;
    const MAX_RIDERS_TO_GET = 10;
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

    console.log('availableRiders:', availableRiders);

    res.send({
      message: 'ok',
      data: {
        eta: -1,
        serviceable: availableRiders.length > 0,
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

export const putRiderLocationController = async (
  req: Request,
  res: Response<PutRiderLocationResponse, ClientAttrs>,
) => {
  try {
    const { latitude, longitude, bearing } = req.body;

    const riderLocationInsertResult = await RiderLocations.create({
      bearing,
      riderId: res.locals.id,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      clientId: res.locals.clientId,
    });

    console.log(
      'inserted riderLocationInsertResult',
      riderLocationInsertResult.id,
    );

    res.send({
      message: 'ok',
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: 'Something went wrong',
    });
  }
};
