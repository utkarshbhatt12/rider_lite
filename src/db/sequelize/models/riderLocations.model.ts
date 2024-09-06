import {
  DataTypes,
  Model,
  type Sequelize,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import type { Riders } from './riders.model';
import type { Clients } from './clients.model';

export class RiderLocations extends Model<
  InferAttributes<RiderLocations>,
  InferCreationAttributes<RiderLocations>
> {
  declare id: CreationOptional<number>;
  declare riderId: ForeignKey<Riders['id']>;
  declare clientId: ForeignKey<Clients['id']>;
  declare location: { type: 'Point'; coordinates: [number, number] };
  declare bearing: number | null;

  // Dates...
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

export default (sequelizeInstance: Sequelize) => {
  return RiderLocations.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      riderId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      location: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      },
      clientId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      bearing: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: {
            args: [0],
            msg: 'Minimum bearing is 0',
          },
          max: {
            args: [360],
            msg: 'Maximum bearing is 360',
          },
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: {
        type: DataTypes.DATE,
        onUpdate: 'CURRENT_TIMESTAMP',
      },
      deletedAt: {
        type: DataTypes.DATE,
        onDelete: 'CURRENT TIMESTAMP',
      },
    },
    {
      sequelize: sequelizeInstance,
      paranoid: true,
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'idx_location',
          fields: ['location'],
          type: 'SPATIAL',
        },
      ],
    },
  );
};
