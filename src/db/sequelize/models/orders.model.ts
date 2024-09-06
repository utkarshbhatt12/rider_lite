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

export class Orders extends Model<
  InferAttributes<Orders>,
  InferCreationAttributes<Orders>
> {
  declare id: CreationOptional<number>;
  declare riderId: ForeignKey<Riders['id']>;
  declare transferredToRiderId: ForeignKey<Riders['id']> | null;

  /**
   * The id of the client who placed the order
   */
  declare clientId: ForeignKey<Clients['id']> | null;
  declare status:
    | 'created'
    | 'assigned'
    | 'arrived_at_pickup_location'
    | 'out_for_delivery'
    | 'arrived_at_destination'
    | 'delivered'
    | 'cancelled'
    | 'transferred';
  declare deliveryAddress: string;
  declare deliveredAt: Date | null;
  declare cancelledAt: Date | null;
  declare cancellationReason: string | null;

  // Dates...
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

export default (sequelizeInstance: Sequelize) => {
  return Orders.init(
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
      transferredToRiderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      // clientId: {
      //   type: DataTypes.BIGINT,
      //   allowNull: true,
      // },
      status: {
        type: DataTypes.ENUM(
          'created',
          'assigned',
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
      cancellationReason: {
        type: DataTypes.STRING,
        allowNull: true,
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
          fields: ['rider_id', 'status'],
        },
      ],
    },
  );
};
