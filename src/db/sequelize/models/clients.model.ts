import {
  DataTypes,
  Model,
  type Sequelize,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';

export class Clients extends Model<
  InferAttributes<Clients>,
  InferCreationAttributes<Clients>
> {
  declare id: CreationOptional<number>;
  declare authToken: string;
  declare name: string;
  declare phoneNumber: string;
  declare isActive: boolean;

  // Dates...
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

export default (sequelizeInstance: Sequelize) => {
  return Clients.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      authToken: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
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
          name: 'idx_auth_token_name',
          fields: ['auth_token', 'name'],
          unique: true,
        },
      ],
    },
  );
};
