import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db'; // Adjust the import path as necessary
import Order from './order'; // Adjust the import path as necessary
import Dish from './dish'; // Adjust the import path as necessary

export interface IOrderDishes
  extends Model<
    InferAttributes<IOrderDishes>,
    InferCreationAttributes<IOrderDishes>
  > {
  id: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;

  quantity: number;
  orderId: CreationOptional<number>;
  dishId: CreationOptional<number>;
}

// Define the OrderDishes model
const OrderDishes = sequelize.define<IOrderDishes>('order_dishes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  dishId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export default OrderDishes;
