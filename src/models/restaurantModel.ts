import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db'; // Adjust the import path as necessary
import User from '../models/userModel'; // Adjust the import path as necessary
import Dish from './dish'; // Adjust the import path as necessary
import Order from './order'; // Adjust the import path as necessary

export interface IRestaurant
  extends Model<
    InferAttributes<IRestaurant>,
    InferCreationAttributes<IRestaurant>
  > {
  id: CreationOptional<number | null>;
  createdAt: CreationOptional<Date | null>;
  updatedAt: CreationOptional<Date | null>;

  name: string;
  location: string;
  status: string;
  userId: number;
}

// Define the Restaurant model
const Restaurant = sequelize.define<IRestaurant>('restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export default Restaurant;
