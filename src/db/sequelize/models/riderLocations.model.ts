import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import sequelizeInstance from '..';
import type { Riders } from './riders.model';

export class Orders extends Model<
  InferAttributes<Orders>,
  InferCreationAttributes<Orders>
> {
  declare id: CreationOptional<number>;
  declare riderId: ForeignKey<Riders['id']>;
  declare location: string;

  // Dates...
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

Orders.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    riderId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'rider_locations',
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
