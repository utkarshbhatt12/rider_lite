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
  declare transferredToRiderId: ForeignKey<Riders['id']> | null;
  declare status:
    | 'created'
    | 'rider_assigned'
    | 'arrived_at_pickup_location'
    | 'out_for_delivery'
    | 'arrived_at_destination'
    | 'delivered'
    | 'cancelled'
    | 'transferred';
  declare deliveryAddress: string;
  declare deliveredAt: Date | null;
  declare cancelledAt: Date | null;

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
    transferredToRiderId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'created',
        'rider_assigned',
        'arrived_at_pickup_location',
        'out_for_delivery',
        'arrived_at_destination',
        'delivered',
        'cancelled',
        'transferred',
      ),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveredAt: DataTypes.DATE,
    cancelledAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeInstance,
    paranoid: true,
    underscored: true,
    timestamps: true,
    indexes: [
      {
        name: 'idx_rider_id_status',
        fields: ['riderId', 'status'],
      },
    ],
  },
);
