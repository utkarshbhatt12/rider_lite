import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import sequelizeInstance from '..';

export class Riders extends Model<
  InferAttributes<Riders>,
  InferCreationAttributes<Riders>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare phoneNumber: string;
  declare pan: string;
  declare aadharNumber: string;
  declare vehicleNumber: string;
  declare vehicleType: '2wheeler' | '3wheeler' | '4wheeler';
  declare isActive: boolean;
  declare gender: 'male' | 'female' | 'other';
  declare dob: Date;

  // Dates...
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

Riders.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    pan: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    aadharNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.ENUM('2wheeler', '3wheeler', '4wheeler'),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
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
        name: 'idx_uniq_phn_no_is_active',
        fields: ['phoneNumber', 'isActive'],
        unique: true,
      },
    ],
  },
);
