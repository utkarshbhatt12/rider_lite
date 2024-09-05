import { Sequelize } from 'sequelize';
import { applyAssociations } from './extraSetup';

const sequelize = new Sequelize({
  dialect: 'mysql',
  logQueryParameters: true,
  benchmark: true,
  logging(sql, timing) {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    console.log(`[Sequelize][executed]: ${sql} in ${timing}`);
  },
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
});

[
  require('./models/orders.model'),
  require('./models/riders.model'),
  require('./models/riderLocations.model'),
].forEach((modelDefiner) => {
  modelDefiner(sequelize);
});

applyAssociations(sequelize);

if (process.env.NODE_ENV === 'development') {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Tables altered');
    })
    .catch((err) => {
      console.error(err);
    });
}

export default sequelize;
