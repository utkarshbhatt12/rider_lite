import type { Sequelize } from 'sequelize';

/**
 * Applies associations between the models.
 *
 * @param {Sequelize} sequelize - The Sequelize instance to apply associations to.
 * @return {void}
 */
export const applyAssociations = (sequelize: Sequelize): void => {
  const {
    models: { Riders, Orders, RiderLocations, Clients },
  } = sequelize;

  Clients.hasMany(Orders);
  // Orders.belongsTo(Clients);

  Clients.hasMany(Orders);

  // Every rider can deliver many orders
  Riders.hasMany(Orders);

  // Order belongs to a rider and rider has many orders
  Orders.belongsTo(Riders);

  // RiderLocations table will have locations of many riders
  RiderLocations.hasMany(Riders);

  // Each rider will have multiple locations
  Riders.hasMany(RiderLocations);

  RiderLocations.belongsTo(Riders);
};
