import express from 'express';
import cors from 'cors';

const { PORT } = process.env;

import type { Express, NextFunction, Request, Response } from 'express';

import 'db/redis';
import 'db/sequelize';

import router from './router';

const bootstrap = (params: { app: Express }) => {
  const { app } = params;

  app.use(cors(), express.json(), express.urlencoded({ extended: true }));

  app.get(
    '/ping',
    (
      _req,
      res: Response<{
        message: string;
        env: typeof process.env.NODE_ENV;
        timestamp: Date;
      }>,
    ) => {
      res.send({
        message: 'PONG',
        env: <string>process.env.NODE_ENV,
        timestamp: new Date(),
      });
    },
  );

  app.use('/v1/', router);

  app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (error) {
      console.error(error);

      res.status(500).send({ message: 'Something went wrong' });

      return;
    }

    next();
  });

  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

bootstrap({ app: express() });
