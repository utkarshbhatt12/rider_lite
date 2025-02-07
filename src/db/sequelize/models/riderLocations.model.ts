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

export class RiderLocations extends Model<
  InferAttributes<RiderLocations>,
  InferCreationAttributes<RiderLocations>
> {
  declare id: CreationOptional<number>;
  declare riderId: ForeignKey<Riders['id']>;
  declare location: string;
  declare status: Riders['status'];

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
      status: {
        type: DataTypes.ENUM('online', 'offline', 'out_for_delivery'),
        allowNull: false,
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
