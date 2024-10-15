import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';
import Dish from './dish';
import OrderDishes from './orderDishesModel';
import Restaurant from './restaurantModel';
import User from './userModel';
import { OrderStatus } from '../types/d/enum';

export interface IOrder
  extends Model<InferAttributes<IOrder>, InferCreationAttributes<IOrder>> {
  id: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  totalPrice: number;
  status: CreationOptional<OrderStatus>;
  userId: number;
  restaurantId: number;
}

// Define the Order model
const Order = sequelize.define<IOrder>('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(OrderStatus),
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export default Order;
