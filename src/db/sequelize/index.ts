import { Sequelize } from 'sequelize';

import { applyAssociations } from './extraSetup';
import orders from './models/orders.model';
import riders from './models/riders.model';
import riderLocations from './models/riderLocations.model';
import clients from './models/clients.model';

const sequelize = new Sequelize(<string>process.env['DB_URL'], {
  logQueryParameters: true,
  benchmark: true,
  logging: (sql, timing) => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    console.log(`[Sequelize][executed]: ${sql} in ${timing}`);
  },
});

[orders, riders, riderLocations, clients].forEach((modelDefiner) => {
  modelDefiner(sequelize);
});

applyAssociations(sequelize);

if (process.env.NODE_ENV === 'development') {
  sequelize
    .sync({ alter: true })
    .then(() => console.log('Tables altered'))
    .catch((err) => console.error(err));
}

export default sequelize;
