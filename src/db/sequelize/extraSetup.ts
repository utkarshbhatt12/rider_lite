import type { Sequelize } from 'sequelize';

export const applyAssociations = (sequelize: Sequelize) => {
  const {
    models: { Riders, Orders, RiderLocations },
  } = sequelize;

  Riders.hasMany(Orders);
  Orders.belongsTo(Riders);
  RiderLocations.hasMany(Riders);
};
