import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db'; // Adjust the import path as necessary
import Restaurant from '../models/restaurantModel'; // Adjust the import path as necessary
import Order from './order'; // Adjust the import path as necessary

export interface IUser
  extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  email: string;
  password: string;
  role: CreationOptional<string>; // Make role optional
  resetPasswordToken: CreationOptional<string | null>; // Make resetPasswordToken optional
  resetPasswordExpires: CreationOptional<Date | null>; //
}

// Define the User model
const User = sequelize.define<IUser>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Default value for role
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

// Define relationships

export default User;
