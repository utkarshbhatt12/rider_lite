import { Clients } from 'db/sequelize/models/clients.model';
import type { Request, Response, NextFunction } from 'express';
import type { ClientAttrs } from 'types';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['authorization'];

    if (typeof authToken !== 'string' || authToken.trim() === '') {
      res.status(401).send({
        message: '"authorization" header is required',
      });

      return;
    }

    const client: ClientAttrs | null = await Clients.findOne({
      attributes: ['id', 'name', 'isActive', 'authToken', 'phoneNumber'],
      where: {
        authToken,
      },
    });

    if (client === null) {
      res.status(401).send({
        message: 'Unknown user. Please connect with support for onboarding',
      });

      return;
    }

    if (!client.isActive) {
      res.status(403).send({
        message: 'User inactive. Please connect with support for help',
      });
    }

    res.locals['client'] = client;

    next(null);
  } catch (error) {
    next(error);
  }
};
