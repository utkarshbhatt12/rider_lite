import type { Express, NextFunction, Request, Response } from 'express';

import express from 'express';
import cors from 'cors';

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
        message: 'PONG';
        env: string;
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

  const {
    env: { PORT },
  } = process;

  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

  return app;
};

bootstrap({ app: express() });
